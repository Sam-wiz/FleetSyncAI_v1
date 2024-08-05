const mysql = require('mysql2/promise');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

class FleetManager {
  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  async manageFleet(messages) {
    if (!Array.isArray(messages)) {
      throw new TypeError('The messages parameter should be an array.');
    }

    try {
      console.log('Messages:', JSON.stringify(messages));
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fleet management assistant."
          },
          ...messages
        ],
        functions: [
          {
            name: "update_truck_status",
            description: "Update the status of a truck",
            parameters: {
              type: "object",
              properties: {
                truckId: { type: "integer" },
                status: { type: "boolean" }
              },
              required: ["truckId", "status"]
            }
          }
        ],
        function_call: "auto"
      });
      console.log('Received response from OpenAI API:', JSON.stringify(completion));
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response from OpenAI API');
      }
      const responseMessage = completion.choices[0].message;
      if (responseMessage.function_call) {
        const functionName = responseMessage.function_call.name;
        const functionArgs = JSON.parse(responseMessage.function_call.arguments);
        console.log(`Function call detected: ${functionName}`);
        console.log('Function arguments:', functionArgs);

        let functionResult;
        if (functionName === "update_truck_status") {
          functionResult = await this.updateTruckStatus(
            functionArgs.truckId,
            functionArgs.status
          );
        }

        console.log('Function result:', functionResult);

        const secondResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            ...messages,
            responseMessage,
            {
              role: "function",
              name: functionName,
              content: JSON.stringify(functionResult)
            }
          ]
        });
        console.log('Received second response: ', JSON.stringify(secondResponse));
        if (!secondResponse.choices || secondResponse.choices.length === 0) {
          throw new Error('No response from OpenAI API');
        }

        // Log messages to the database
        await this.logMessage('FleetManager', JSON.stringify(messages), secondResponse.choices[0].message.content);

        return secondResponse.choices[0].message.content;
      }

      // Log messages to the database when there's no function call
      await this.logMessage('FleetManager', JSON.stringify(messages), responseMessage.content);

      if (!responseMessage.content) {
        return "I'm unable to assist with that request right now. Please try again later.";
      }
      return responseMessage.content;
    } catch (error) {
      console.error('Error in FleetManager service:', error);
      if (error.response) {
        console.error('OpenAI API error response:', error.response.data);
      } else if (error.message.includes('No response from OpenAI API')) {
        return "The OpenAI service is currently unavailable. Please try again later.";
      }
      throw error;
    }
  }

  async updateTruckStatus(truckId, status) {
    try {
      const [result] = await this.connection.query(
        `UPDATE truck SET status = ? WHERE truck_id = ?`,
        [status, truckId]
      );
      return result;
    } catch (error) {
      console.error('Error updating truck status:', error);
      throw error;
    }
  }

  async logMessage(agentName, userInput, agentResponse) {
    try {
      const [result] = await this.connection.query(
        'INSERT INTO messages (agent_name, user_input, agent_response) VALUES (?, ?, ?)',
        [agentName, userInput, agentResponse]
      );
      return result;
    } catch (error) {
      console.error('Error logging message:', error);
      throw error;
    }
  }
}

module.exports = FleetManager;

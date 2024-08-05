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

class BookingManager {
  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  async manageBooking(messages) {
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
            content: "You are a booking management assistant. Your job is to handle transport bookings and optimize routes using the hybrid hub-and-spoke model."
          },
          ...messages
        ],
        functions: [
          {
            name: "book_transport",
            description: "Book transport and provide route details",
            parameters: {
              type: "object",
              properties: {
                transporterId: { type: "integer" },
                source: { type: "string" },
                destination: { type: "string" },
                deadline: { type: "string" }
              },
              required: ["transporterId", "source", "destination", "deadline"]
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
        if (functionName === "book_transport") {
          functionResult = await this.bookTransport(
            functionArgs.transporterId,
            functionArgs.source,
            functionArgs.destination,
            functionArgs.deadline
          );
        }

        console.log('Function result:', functionResult);

        const secondResponse = await openai.chat.completions.create({
          model: "gpt-4",
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
        return secondResponse.choices[0].message.content;
      }
      if (!responseMessage.content) {
        return "I'm unable to assist with that request right now. Please try again later.";
      }
      return responseMessage.content;
    } catch (error) {
      console.error('Error in BookingManager service:', error);
      if (error.response) {
        console.error('OpenAI API error response:', error.response.data);
      } else if (error.message.includes('No response from OpenAI API')) {
        return "The OpenAI service is currently unavailable. Please try again later.";
      }
      throw error;
    }
  }

  async bookTransport(transporterId, source, destination, deadline) {
    try {
      const [result] = await this.connection.query(
        `INSERT INTO booking (transporter_id, booking_date, delivery_date, isCompleted, truck_id, path_id, payload)
         VALUES (?, NOW(), ?, false, NULL, NULL, ?)`,
        [transporterId, deadline, 'Generic Payload']
      );
      return { bookingId: result.insertId };
    } catch (error) {
      console.error('Error booking transport:', error);
      throw error;
    }
  }

  async logMessage(agentName, userInput, agentResponse) {
    try {
      await this.connection.query(
        'INSERT INTO messages (agent_name, user_input, agent_response) VALUES (?, ?, ?)',
        [agentName, userInput, agentResponse]
      );
    } catch (error) {
      console.error('Error logging message:', error);
      throw error;
    }
  }
}

module.exports = BookingManager;

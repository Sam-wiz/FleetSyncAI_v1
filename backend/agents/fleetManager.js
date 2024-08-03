const mysql = require('mysql2/promise');
const openai = require('openai');
require('dotenv').config();
openai.apiKey = process.env.OPENAI_API_KEY;

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

  async manageFleet(truckId, operation) {
    // Use OpenAI API to optimize fleet management decisions
    const prompt = `Truck ${truckId} needs to ${operation}. Suggest optimal strategies for cost management and profit maximization.`;
    try {
      const response = await openai.ChatCompletion.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a fleet management assistant.' },
          { role: 'user', content: prompt }
        ]
      });
      const answer = response.choices[0].message.content.trim();

      // Implement database logic for truck management based on the operation
      if (operation === 'update status') {
        await this.connection.query(
          `UPDATE truck SET status = NOT status WHERE truck_id = ?`,
          [truckId]
        );
      }

      await this.logMessage('FleetManager', prompt, answer);
      return answer;
    } catch (error) {
      console.error('Error managing fleet:', error);
      return 'An error occurred while managing the fleet.';
    }
  }

  async logMessage(agentName, userInput, agentResponse) {
    await this.connection.query(
      'INSERT INTO messages (agent_name, user_input, agent_response) VALUES (?, ?, ?)',
      [agentName, userInput, agentResponse]
    );
  }
}

module.exports = FleetManager;

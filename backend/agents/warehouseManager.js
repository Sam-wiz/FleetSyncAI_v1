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

class WarehouseManager {
  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  async manageInventory(warehouseId, operation, item, quantity) {
    // Use OpenAI API to decide on inventory management strategies
    const prompt = `Warehouse ${warehouseId} needs to ${operation} ${quantity} units of ${item}. Suggest strategies for optimal inventory management and maximizing warehouse revenue.`;
    try {
      const response = await openai.ChatCompletion.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a warehouse management assistant.' },
          { role: 'user', content: prompt }
        ]
      });
      const answer = response.choices[0].message.content.trim();

      // Implement database logic based on the operation (add/remove inventory)
      if (operation === 'add') {
        await this.connection.query(
          `INSERT INTO warehouse_inventory (warehouse_id, item, quantity) VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
          [warehouseId, item, quantity]
        );
      } else if (operation === 'remove') {
        await this.connection.query(
          `UPDATE warehouse_inventory SET quantity = quantity - ? WHERE warehouse_id = ? AND item = ?`,
          [quantity, warehouseId, item]
        );
      }

      await this.logMessage('WarehouseManager', prompt, answer);
      return answer;
    } catch (error) {
      console.error('Error managing inventory:', error);
      return 'An error occurred while managing inventory.';
    }
  }

  async logMessage(agentName, userInput, agentResponse) {
    await this.connection.query(
      'INSERT INTO messages (agent_name, user_input, agent_response) VALUES (?, ?, ?)',
      [agentName, userInput, agentResponse]
    );
  }
}

module.exports = WarehouseManager;

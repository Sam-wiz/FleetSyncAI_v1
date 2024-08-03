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

class BookingManager {
  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  async manageBooking(transporterId, source, destination, deadline) {
    // Use OpenAI API to generate optimal routes and booking strategies
    const prompt = `Book transport from ${source} to ${destination} for transporter ${transporterId} with a deadline of ${deadline}. Suggest routes and strategies using the hybrid hub-and-spoke model.`;
    try {
      const response = await openai.ChatCompletion.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a booking management assistant.' },
          { role: 'user', content: prompt }
        ]
      });
      const answer = response.choices[0].message.content.trim();

      // Example database logic for booking
      const [result] = await this.connection.query(
        `INSERT INTO booking (transporter_id, booking_date, delivery_date, isCompleted, truck_id, path_id, payload)
         VALUES (?, NOW(), ?, false, NULL, NULL, ?)`,
        [transporterId, deadline, 'Generic Payload']
      );

      await this.logMessage('BookingManager', prompt, answer);
      return { bookingId: result.insertId, routeDetails: answer };
    } catch (error) {
      console.error('Error managing booking:', error);
      return 'An error occurred while managing the booking.';
    }
  }

  async logMessage(agentName, userInput, agentResponse) {
    await this.connection.query(
      'INSERT INTO messages (agent_name, user_input, agent_response) VALUES (?, ?, ?)',
      [agentName, userInput, agentResponse]
    );
  }
}

module.exports = BookingManager;

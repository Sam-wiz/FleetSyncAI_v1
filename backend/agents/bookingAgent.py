# agents/booking_agent.py

from flask import Flask, request, jsonify
import mysql.connector
import openai  # Add this line
from config import db_config, openai_api_key

app = Flask(__name__)

class BookingAgent:
    def __init__(self, db_config):
        self.connection = mysql.connector.connect(**db_config)
        self.cursor = self.connection.cursor(dictionary=True)
        openai.api_key = openai_api_key

    def book_truck(self, user_id, source, destination, deadline):
        self.cursor.execute("""
            INSERT INTO booking (user_id, source, destination, deadline)
            VALUES (%s, %s, %s, %s)
        """, (user_id, source, destination, deadline))
        self.connection.commit()
        return self.cursor.lastrowid

    def get_recommendations(self, source, destination, deadline):
        # Use OpenAI to generate recommendations
        prompt = f"Recommend trucks for transporting goods from {source} to {destination} by {deadline}."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )
        recommendations = response.choices[0].text.strip()
        return [{"recommendations": recommendations}]

    def __del__(self):
        self.cursor.close()
        self.connection.close()

booking_agent = BookingAgent(db_config)

@app.route('/book_truck', methods=['POST'])
def book_truck():
    data = request.json
    booking_id = booking_agent.book_truck(data['user_id'], data['source'], data['destination'], data['deadline'])
    return jsonify({"booking_id": booking_id})

@app.route('/get_recommendations', methods=['GET'])
def get_recommendations():
    source = request.args.get('source')
    destination = request.args.get('destination')
    deadline = request.args.get('deadline')
    recommendations = booking_agent.get_recommendations(source, destination, deadline)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(port=5003)

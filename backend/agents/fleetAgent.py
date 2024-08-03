# agents/fleet_agent.py

from flask import Flask, request, jsonify
import mysql.connector
import openai
from config import db_config, openai_api_key

app = Flask(__name__)

class FleetAgent:
    def __init__(self, db_config):
        self.connection = mysql.connector.connect(**db_config)
        self.cursor = self.connection.cursor(dictionary=True)
        openai.api_key = openai_api_key

    def optimize_routes(self, source, destination, deadline):
        prompt = f"Optimize the route from {source} to {destination} with a deadline of {deadline}."
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for route optimization."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response['choices'][0]['message']['content'].strip()
        except Exception as e:
            return f"Error occurred: {e}"

    def assign_truck(self, truck_id, booking_id):
        self.cursor.execute("""
            UPDATE booking SET truck_id = %s WHERE booking_id = %s
        """, (truck_id, booking_id))
        self.connection.commit()

    def update_truck_status(self, truck_id, status):
        self.cursor.execute("""
            UPDATE truck SET status = %s WHERE truck_id = %s
        """, (status, truck_id))
        self.connection.commit()

    def __del__(self):
        try:
            if self.cursor:
                self.cursor.close()
            if self.connection:
                self.connection.close()
        except Exception as e:
            print(f"Error closing resources: {e}")

fleet_agent = FleetAgent(db_config)

@app.route('/optimize_routes', methods=['GET'])
def optimize_routes():
    source = request.args.get('source')
    destination = request.args.get('destination')
    deadline = request.args.get('deadline')
    route = fleet_agent.optimize_routes(source, destination, deadline)
    return jsonify({"route": route})

@app.route('/assign_truck', methods=['POST'])
def assign_truck():
    data = request.json
    fleet_agent.assign_truck(data['truck_id'], data['booking_id'])
    return jsonify({"status": "success"})

@app.route('/update_truck_status', methods=['POST'])
def update_truck_status():
    data = request.json
    fleet_agent.update_truck_status(data['truck_id'], data['status'])
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(port=5002)

# agents/tracking_agent.py

from flask import Flask, request, jsonify
import mysql.connector
from config import db_config

app = Flask(__name__)

class TrackingAgent:
    def __init__(self, db_config):
        self.connection = mysql.connector.connect(**db_config)
        self.cursor = self.connection.cursor(dictionary=True)

    def update_location(self, truck_id, location, timestamp):
        self.cursor.execute("""
            UPDATE truck SET location = %s, timestamp = %s WHERE truck_id = %s
        """, (location, timestamp, truck_id))
        self.connection.commit()

    def get_location(self, truck_id):
        self.cursor.execute("""
            SELECT location, timestamp FROM truck WHERE truck_id = %s
        """, (truck_id,))
        return self.cursor.fetchone()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

tracking_agent = TrackingAgent(db_config)

@app.route('/update_location', methods=['POST'])
def update_location():
    data = request.json
    tracking_agent.update_location(data['truck_id'], data['location'], data['timestamp'])
    return jsonify({"status": "success"})

@app.route('/get_location', methods=['GET'])
def get_location():
    truck_id = request.args.get('truck_id')
    location = tracking_agent.get_location(truck_id)
    return jsonify(location)

if __name__ == "__main__":
    app.run(port=5004)

# agents/warehouse_agent.py

from flask import Flask, request, jsonify
import mysql.connector
from config import db_config, openai_api_key
import openai

app = Flask(__name__)

class WarehouseAgent:
    def __init__(self, db_config):
        self.connection = mysql.connector.connect(**db_config)
        self.cursor = self.connection.cursor(dictionary=True)
        openai.api_key = openai_api_key

    def add_inventory(self, warehouse_id, item, quantity):
        self.cursor.execute("""
            INSERT INTO warehouse_inventory (warehouse_id, item, quantity)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
        """, (warehouse_id, item, quantity))
        self.connection.commit()

    def get_stock_levels(self, warehouse_id):
        self.cursor.execute("""
            SELECT item, quantity FROM warehouse_inventory
            WHERE warehouse_id = %s
        """, (warehouse_id,))
        return self.cursor.fetchall()

    def check_availability(self, warehouse_id):
        self.cursor.execute("""
            SELECT capacity, availability FROM warehouse WHERE warehouse_id = %s
        """, (warehouse_id,))
        return self.cursor.fetchone()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

warehouse_agent = WarehouseAgent(db_config)

@app.route('/add_inventory', methods=['POST'])
def add_inventory():
    data = request.json
    warehouse_agent.add_inventory(data['warehouse_id'], data['item'], data['quantity'])
    return jsonify({"status": "success"})

@app.route('/get_stock_levels', methods=['GET'])
def get_stock_levels():
    warehouse_id = request.args.get('warehouse_id')
    stock_levels = warehouse_agent.get_stock_levels(warehouse_id)
    return jsonify(stock_levels)

@app.route('/check_availability', methods=['GET'])
def check_availability():
    warehouse_id = request.args.get('warehouse_id')
    availability = warehouse_agent.check_availability(warehouse_id)
    return jsonify(availability)

if __name__ == "__main__":
    app.run(port=5001)

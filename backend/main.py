# main.py

from flask import Flask, request, jsonify
from agents.warehouseAgent import WarehouseAgent
from agents.fleetAgent import FleetAgent
from agents.bookingAgent import BookingAgent
from agents.trackingAgent import TrackingAgent
from config import db_config, openai_api_key

app = Flask(__name__)

# Initialize agents
warehouse_agent = WarehouseAgent(db_config)
fleet_agent = FleetAgent(db_config)
booking_agent = BookingAgent(db_config)
tracking_agent = TrackingAgent(db_config)

# Warehouse Agent Routes
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

# Fleet Agent Routes
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

# Booking Agent Routes
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

# Tracking Agent Routes
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
    app.run(host='0.0.0.0', port=5000)
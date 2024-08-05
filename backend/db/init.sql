-- Drop Tables If They Exist (optional, only if you want to drop existing tables)
DROP TABLE IF EXISTS warehouse_schedule;
DROP TABLE IF EXISTS warehouse_inventory;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS warehouse;
DROP TABLE IF EXISTS transporter;
DROP TABLE IF EXISTS path;
DROP TABLE IF EXISTS truck;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS truck_owner;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50)
);

-- Create Truck Owner Table
CREATE TABLE IF NOT EXISTS truck_owner (
    truck_owner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Driver Table
CREATE TABLE IF NOT EXISTS driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create City Table
CREATE TABLE IF NOT EXISTS city (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL
);

-- Create Truck Table
CREATE TABLE IF NOT EXISTS truck (
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    city_id INT,
    status BOOLEAN,
    location VARCHAR(255),
    timestamp DATETIME,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

-- Create Path Table
CREATE TABLE IF NOT EXISTS path (
    path_id INT AUTO_INCREMENT PRIMARY KEY,
    source INT,
    destination INT,
    FOREIGN KEY (source) REFERENCES city(city_id),
    FOREIGN KEY (destination) REFERENCES city(city_id)
);

-- Create Transporter Table
CREATE TABLE IF NOT EXISTS transporter (
    transporter_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Warehouse Table
CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city_id INT,
    capacity INT,
    availability BOOLEAN,
    price_per_day INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

-- Create Booking Table
CREATE TABLE IF NOT EXISTS booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    transporter_id INT,
    booking_date DATE,
    delivery_date DATE,
    isCompleted BOOLEAN,
    truck_id INT,
    path_id INT,
    payload VARCHAR(255),
    FOREIGN KEY (transporter_id) REFERENCES transporter(transporter_id),
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (path_id) REFERENCES path(path_id)
);

-- Create Warehouse Inventory Table
CREATE TABLE IF NOT EXISTS warehouse_inventory (
    warehouse_id INT,
    item VARCHAR(255),
    quantity INT,
    PRIMARY KEY (warehouse_id, item),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
);

-- Create Warehouse Schedule Table
CREATE TABLE IF NOT EXISTS warehouse_schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    warehouse_id INT,
    arrival_time DATETIME,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    agent_name VARCHAR(50),    
    user_input TEXT,           
    agent_response TEXT,       
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

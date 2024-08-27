# FleetSyncAI_v1

FleetSyncAI is a cutting-edge platform designed to revolutionize the logistics industry by automating the booking and management of trucks, fleet operations, and warehouse activities. Leveraging the power of AI agents, FleetSyncAI ensures that all logistics management tasks are handled efficiently and intelligently.

## Features

- **Truck Booking**: Users can seamlessly book trucks for their logistics needs, with AI agents optimizing the selection process based on route, availability, and cost.
  
- **Fleet Management**: AI-driven fleet managers oversee the entire fleet, ensuring optimal utilization, maintenance scheduling, and real-time monitoring of all vehicles.
  
- **Warehouse Management**: Warehouse managers powered by AI handle inventory tracking, space optimization, and order fulfillment to ensure smooth and efficient warehouse operations.
  
- **AI-Powered Decision Making**: Our AI agents are designed to make informed decisions, optimizing logistics workflows, reducing costs, and improving delivery times.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: The platform uses MongoDB for data storage. Ensure you have a MongoDB instance running, either locally or through a cloud provider like MongoDB Atlas.
- **Docker**: Install Docker to run the AI agents in a containerized environment. You can download Docker from [here](https://www.docker.com/).

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Sam-wiz/FleetSyncAI_v1.git
    cd FleetSyncAI_v1
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and configure your environment variables.

4. **Start the development server**:

    ```bash
    npm run dev
    ```

5. **Build and Run the Docker Container**:

    The Docker container is used to run the AI agents that power the platform’s decision-making processes.

    - **Build the Docker image**:

      ```bash
      docker-compose up --build
      ```

6. **Access the platform**:

    The platform will be available at `http://localhost:3000`.

### Database Setup

Make sure your MongoDB instance is running and that the connection string is correctly set in your `.env` file. Mongoose will handle the connection to the database.

### API Integration

The platform integrates with OpenAI's API to optimize transport routes and other logistics tasks. Ensure you have an API key from OpenAI and add it to your `.env` file.

## Usage

1. **Booking a Truck**: Users can book a truck through the platform by providing necessary details such as origin, destination, and cargo type. The AI agent will handle the rest, including selecting the best truck and route.
  
2. **Fleet Management**: The AI-powered fleet manager monitors and manages the entire fleet, making real-time decisions to optimize operations.

3. **Warehouse Management**: The AI-driven warehouse manager ensures that inventory is tracked accurately, and orders are fulfilled efficiently.

## Contributing

We welcome contributions from the community. If you'd like to contribute, please fork the repository and create a pull request with your changes.

---

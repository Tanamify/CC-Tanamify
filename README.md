# Tanamify Backend API

## Description

This repository contains the backend API for the Tanamify project. The backend is built using Express.js and provides several endpoints for user authentication and prediction data management. Additionally, the backend is deployed on Google Cloud Compute Engine, with MySQL as the database.

## Features

- Develop Backend API for Register, Login, Logout, and Get Login User using Express.js
- Create Backend API to Store Prediction Data and Get Prediction Data by User using Express.js
- Perform API Testing with Postman
- Deploy Backend on Google Cloud Compute Engine
- Deploy MySQL on Google Cloud Compute Engine
- Create firewall rules

## Getting Started

### Prerequisites

- Node.js
- Express.js
- MySQL
- Postman
- Google Cloud Account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Tanamify/CC-Tanamify.git
    ```
2. Install dependencies:
    ```sh
    cd CC-Tanamify
    npm install
    ```
3. Set up MySQL database on Google Cloud Compute Engine.

4. Configure environment variables:
    ```sh
    cp .env.example .env
    ```
   Update the `.env` file with your database credentials and other necessary configuration.

### Running the API

Start the server:
```sh
npm start
```

The backend API will be available at `34.101.178.174:3000`.

## API Endpoints

### User Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Get Login User**: `GET /api/auth/profile`

### Prediction Data

- **Store Prediction Data**: `POST /api/predict/add`
- **Get Prediction Data by User**: `GET /api/predict/user-predictions`

## Testing

Perform API testing using Postman:
1. Import the Postman collection provided in the repository.
2. Run the tests to ensure all endpoints are working correctly.

## Deployment

### Deploy Backend on Google Cloud Compute Engine

1. Set up a VM instance on Google Cloud Compute Engine.
2. SSH into the VM and clone the repository.
3. Install Node.js and other dependencies on the VM.
4. Configure and start the backend server on the VM.

### Deploy MySQL on Google Cloud Compute Engine

1. Set up a MySQL instance on Google Cloud Compute Engine.
2. Configure the database and update the backend API to connect to this instance.

### Create Firewall Rules

1. Create firewall rules to allow traffic on the required ports for your backend API and MySQL instance.

## Contributors

| Name                | ID           |
|---------------------|--------------|
| Erlan Irhab Ghalib  | C200D4KY0885 |
| Derva Anargya Ghaliy | C200D4KY0347 |

---

Feel free to reach out if you have any questions or need further assistance!
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!

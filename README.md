

# ConnectVerse

ConnectVerse is a full-stack web application that connects users through a platform that allows them to sign up, log in, and engage in various activities. The project consists of both a backend and a frontend, built using modern technologies.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing

### Frontend

- React.js
- React Router for Routing and Navigation
- Tailwind CSS
- React Hook Form
- Yup for form handling

## Features

- User authentication (sign up, login, logout)
- Middlewares for protected routes for user-specific content
- Profile management
- Attractive UI developed using TailWind CSS
- Clean and organized code structure

## Installation

To get started with ConnectVerse, follow these steps:

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/padmapriyar04/ConnectVerse-Task.git
   cd ConnectVerse_Backend
2. Install dependencies:
    ```bash
    npm install
3. Create a .env file in the ConnectVerse_Backend directory and configure the following variables:
    ```bash
    PORT=<your_port>
    MONGO_URI=<your_mongodb_connection_string>
    JWT_ACCESS_SECRET=<your_jwt_access_token_secret>
    JWT_REFRESH_SECRET=<your_jwt_refresh_token_secret>
    JWT_ACCESS_EXP=<your_jwt_access_expiration_time>
    JWT_REFRESH_EXP=<your_jwt_refresh_expiration_time>


4. Start the Server:
    ```bash
    nodemon index.js

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ConnectVerse_Frontend

2. Install dependencies:
    ```bash
    npm install

3.Configure environment variables:

    REACT_APP_LOGIN_URL=<your_backend_login_api_endpoint>
    REACT_APP_SIGNUP_URL=<your_backend_signup_api_endpoint>

4. Start React application
    ```bash
    npm start

5. Open your browser and go to http://localhost:3000 (or the port specified in your setup) to access the application.

## Usage

You can create a new account, log in, and start using the application.

## API Documentation

The backend API is built with RESTful principles. Below are some key endpoints:
    
- POST /api/auth/signup: Register a new user
- POST /api/auth/login: Log in a user

## Contributing
Contributions are welcome! If you have suggestions for improvements or features, feel free to fork the repository and submit a pull request.


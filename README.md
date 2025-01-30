# PayTm - Simple Payments App

This project is a basic and initial version of a payments app similar to PayTm. It includes both a frontend and backend:

- **Frontend**: Built with React and Vite
- **Backend**: Built with Node.js, Express, and MongoDB
- **Authentication**: Sign-in and sign-up pages for user authentication
- **Dashboard**: Displays user information such as balance and a list of users
- **Send Money**: Allows users to send money to others
- **Settings**: Users can update their credentials or delete their account

## Features

- **User Authentication**: Sign in and sign-up functionality with JWT-based authentication
- **User Dashboard**: View balance and user info
- **Send Money**: Simple page to transfer money to another user
- **Account Settings**: Update personal information and delete the account
- **MongoDB Integration**: User data and transactions are stored in MongoDB

## Steps to Run the Application

### 1. Clone the Repository
Clone the repo to your local machine:

```bash
git clone https://github.com/shivaKotagiri/PayTm.git
```

### 2. Install Dependencies

- Navigate to the project directory and install dependencies for both frontend and backend:

```bash
cd PayTm
# For Frontend (React)
cd frontend
npm install
# Or, if you prefer yarn
yarn install
cd ..

# For Backend (Node.js/Express)
cd backend
npm install
# Or, if you prefer yarn
yarn install
cd ..
```

### 3. Configure MongoDB and JWT

- Add your MongoDB connection string in the backend config file.
- Set up JWT tokens for authentication (if required).

### 4. Run the Frontend

To start the React frontend with Vite, use:

```bash
cd frontend
npm run dev
```

### 5. Run the Backend

To start the Node.js backend, use:

```bash
cd backend
node index.js
```

### 6. Prerequisites

Ensure that you have the following installed on your local machine:

- Git
- Node.js

You can download Node.js from [here](https://nodejs.org/).

---

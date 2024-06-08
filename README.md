# User Services

This repository contains two services:

1. **User Actions Service**: An API to manage user actions.
2. **User Management Service**: An API to create and update users.

## Prerequisites

- Node.js installed on your machine
- PostgreSQL database installed and running

# User Actions Service

This service provides an API to manage user actions using Express.js and Prisma.

## Getting Started

To get this service up and running, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/kol3x/test-task-3
    ```

2. Navigate to the project directory:

    ```bash
    cd test-task-3/ts-actionhistory-service
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
   
    Create a `.env` file in the root directory and add the following variables:
    
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=actions
    PORT=4000
    ```

    Replace `username`, `password`, and `database_name` with your PostgreSQL credentials.

5. Run migrations:

    ```bash
    npx prisma migrate dev
    ```

6. Start the server:

    ```bash
    ts-node src/index.ts
    ```

    The server will start running at `http://localhost:4000`.

## API Endpoints

- `GET /actions`: Retrieves user actions with pagination. Parameters:
  - `userId`: (required) ID of the user whose actions to retrieve.
  - `page`: (optional) Page number for pagination (default: 1).
  - `pageSize`: (optional) Number of actions per page (default: 10).
- `POST /actions`: Creates a new action (Not supposed to be called directly)

## Second Service: User Management

2. Navigate to the project directory:

    ```bash
    cd ../express-user-service
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
   
    Create a `.env` file in the root directory and add the following variables:
    
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=users
    PORT=3000
    HISTORY_SERVICE_URL=http://localhost:4000
    ```

    Replace `username`, `password`, and `database_name` with your PostgreSQL credentials.

5. Run migrations:

    ```bash
    npx prisma migrate dev
    ```

6. Start the server:

    ```bash
    node src/index.ts
    ```

    The server will start running at `http://localhost:3000`.

### API Endpoints

- `POST /users`: Creates a new user with the provided details.
- `PUT /users/:id`: Updates user with the provided details.

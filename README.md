# SMS Scheduling Service

This is a simple SMS scheduling microservice that allows users to schedule SMS messages to be sent at a specified time. The service uses SQLite for task management and Twilio API for sending SMS.

## Features

- Schedule SMS messages to be sent at a specified time.
- View all scheduled tasks.
- Delete or update scheduled tasks.
- Cron-based system for checking pending tasks and sending SMS.
- Built using **Node.js**, **Express**, **SQLite**, **SendGrid** and **Twilio**.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v12.x or later)
- **npm** (comes with Node.js)
- **Twilio Account** (for sending SMS)
- **SendGrid Account** (for sending emails)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ClubJunkie_notification_microservice.git
   cd ClubJunkie_notification_microservice
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the root of the project and add the following environment variables:

   ```bash
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_NUMBER=your_twilio_phone_number
   SENDGRID_API_KEY="your_sendgrid_api_key"
   PORT=2000  # or any other port number
   ```

4. Set up the SQLite database. The application will automatically create a `tasks.db` file on first run.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will run on the specified `PORT` (default: 2000).

2. **Schedule an SMS** by sending a POST request to `/task` with the following payload:

   ```json
   {
     "phoneNumber": "+1234567890",
     "message": "Hello, this is your reminder!",
     "executionHours": 5,
     "email": "test@test.com",
     "extendedMessage": "for example listing id"
   }
   ```

   This will schedule the message to be sent in 5 hours.

3. **View all scheduled tasks** by sending a GET request to `/tasks`.

4. **Delete a task** by sending a DELETE request to `/task/:id`.

5. **Update a task** by sending a PUT request to `/task/:id` with the updated task data.

### Example API Requests

- **Schedule an SMS**

  ```bash
  curl -X POST http://localhost:2000/task \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "message": "Test SMS", "executionHours": 2, "email": "test@test.com", "extendedMessage": "1234567890"}'
  ```

- **View All Tasks**

  ```bash
  curl http://localhost:2000/tasks
  ```

- **Delete a Task**

  ```bash
  curl -X DELETE http://localhost:2000/task/1
  ```

## Project Structure

```
/project-root
│
├── /config           # Configuration files
│   └── db.js         # SQLite database connection
│
├── /controllers      # Request handling logic
│   └── taskController.js  # Task-related controllers
│
├── /models           # Database models
│   └── taskModel.js  # Task database queries
│
├── /routes           # API routes
│   └── taskRoutes.js # Task routes
│
├── /services         # Business logic services
│   └── smsService.js # Twilio SMS service
│   └── emailService.js # Sendgrid SMS service
│
├── /utils            # Utility functions
│   └── cronJob.js    # Cron job for checking tasks
│
├── .env              # Environment variables
├── app.js            # Main app entry point
└── package.json      # Project dependencies
```

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **SQLite**: Lightweight database for storing scheduled tasks.
- **Twilio**: Cloud communication platform for sending SMS.
- **Cron**: Task scheduling library to run scheduled jobs.

## Environment Variables

- `TWILIO_ACCOUNT_SID`: Your Twilio Account SID.
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token.
- `TWILIO_NUMBER`: The Twilio number from which the SMS will be sent.
- `SENDGRID_API_KEY`: Your sendgrid token
- `PORT`: The port on which the server will run (default is 2000).

## Error Handling

The service includes error handling for:

- Invalid phone numbers.
- Missing or invalid payload data.
- Twilio API errors when sending SMS.
- Task not found during deletion or update.

## Development

During development, you can use `nodemon` for automatically restarting the server when file changes are detected.

```bash
npm install -g nodemon
nodemon app.js
```

### Running Tests

You can add tests for the service using libraries like Mocha or Jest. This project currently does not include tests.

## Future Improvements

- Add authentication and authorization.
- Implement other types of notifications.
- Add support for rescheduling tasks.
- Integrate a more advanced task scheduler for different types of timezones.

# Task Manager

## Getting Started

Copy .env.example to .env to both api and frontend

### Prerequisites

- Node.js 20.x
- pnpm / npm / yarn

## Api

1. Install dependencies
   ```sh
   pnpm install
   ```
2. Migrate database and seed data
   ```sh
   pnpm migrate
   ```
3. Start the server
   ```sh
   pnpm dev
   ```
4. Open the browser and navigate to http://localhost:3000/api

## Frontend

1. Install dependencies
   ```sh
   pnpm install
   ```
2. Start the server
   ```sh
   pnpm dev
   ```
3. Open the browser and navigate to http://localhost:5173

## Test the features

User can only access the dashboard page and tasks page.
Admin can access all pages.

### Admin

1. Login as admin
   - LoginId: admin
   - Password: password
2. Create a task type
   - Name: Development
3. Create a task
   - Title: Meeting with team
   - Task Type: Development
   - Date: 2021-01-01T00:00:00.000Z
   - Start Time: 19:00
   - End Time: 20:00
4. Update the task
   - Title: Meeting with team-updated
   - Task Type: Other
   - Date: 2021-01-01T00:00:00.000Z
   - Start Time: 19:00
   - End Time: 23:00
5. Delete the task

### User

1. Login as user
   - LoginId: user2
   - Password: password
2. Create a task
   - Title: Meeting with team
   - Task Type: Development
   - Date: 2021-01-01T00:00:00.000Z
   - Start Time: 19:00
   - End Time: 20:00
3. Update the task
   - Title: Meeting with team
   - Task Type: Development
   - Date: 2021-01-01T00:00:00.000Z
   - Start Time: 19:00
   - End Time: 20:00
4. Delete the task
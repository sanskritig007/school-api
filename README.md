# School Management API

This is a Node.js REST API for managing schools. It includes capabilities to add new schools and retrieve a list of schools sorted by proximity to a given geographical location using the Haversine formula.

## Prerequisites

- Node.js installed
- MySQL Database running locally or remotely

## Setup Instructions

1. **Clone the repository** (if you haven't already).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up the Database**: 
   - Execute the queries inside `init.sql` on your MySQL instance to create the database (`schooldb`) and the `schools` table.
4. **Environment Variables**:
   - Rename `.env.example` to `.env`.
   - Update `.env` with your database credentials.
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=schooldb
   PORT=3000
   ```

## Running the Application

To start the API server locally:
```bash
npm start
```
The server will default to port 3000 unless specified in the `.env` file.

## API Examples

### 1. Add a School
**URL:** `/api/addSchool`
**Method:** `POST`
**Body:**
```json
{
  "name": "Green Valley High",
  "address": "123 Education Lane, City",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

### 2. List Schools Sorted by Proximity
**URL:** `/api/listSchools?latitude=28.7&longitude=77.1`
**Method:** `GET`
**Description:** Fetches all schools and sorts them by their distance to the provided coordinates.

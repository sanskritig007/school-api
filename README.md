# School Management API

This is a Node.js REST API for managing schools. It includes capabilities to add new schools and retrieve a list of schools sorted by proximity to a given geographical location using the Haversine formula.

🚀 **Live API Base URL:** [https://school-api-mzee.onrender.com](https://school-api-mzee.onrender.com)

## Prerequisites

- Node.js installed
- MySQL Database running locally or remotely (e.g., Aiven)

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
   - Update `.env` with your Aiven database credentials.
   ```env
   DB_HOST=mysql-30d910b9-sanskritig007-api.h.aivencloud.com
   DB_USER=avnadmin
   DB_PASSWORD=your_aiven_password
   DB_NAME=defaultdb
   DB_PORT=26324
   PORT=3000
   ```

## Running the Application Locally

To start the API server locally:
```bash
npm start
```
The server will default to port 3000 unless specified in the `.env` file.

## Live API Endpoints & Examples

### 1. Add a School
**URL:** `https://school-api-mzee.onrender.com/api/addSchool`
**Method:** `POST`
**Body:**
```json
{
  "name": "Live Test School",
  "address": "Delhi",
  "latitude": 28.61,
  "longitude": 77.23
}
```

### 2. List Schools Sorted by Proximity
**URL:** `https://school-api-mzee.onrender.com/api/listSchools?latitude=28.56&longitude=77.31`
**Method:** `GET`
**Description:** Fetches all schools from the database and returns them sorted ascendingly by their mathematical geographical distance from the user-provided location.

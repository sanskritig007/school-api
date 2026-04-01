require("dotenv").config();
const express = require("express");

// Initialize DB pool connection
require("./config/db");

const app = express();
const schoolRoutes = require("./routes/schoolRoutes");

// Middlewares
app.use(express.json());

// Routes
app.use("/api", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API is running.");
});

// 404 
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found. Please check the URL." });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err);
  
  // Syntax error from body-parser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON payload." });
  }

  res.status(500).json({ error: "An unexpected internal server error occurred." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
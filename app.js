const express = require("express");

require("./config/db");

const app = express();

const schoolRoutes = require("./routes/schoolRoutes");


// middleware
app.use(express.json());

app.use("/api", schoolRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
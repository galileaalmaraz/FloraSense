const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors"); // Import CORS

const app = express(); // Initialize the Express app

// Apply CORS middleware with specific options
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Allow requests from your frontend
};
app.use(cors(corsOptions)); // Apply the middleware

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define the port for your server
const port = 3005; // Add this line to define the port

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "VeganPizza123.",
  database: "florasense",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.query("SELECT 1 + 1 AS solution", (err, results) => {
  if (err) {
    console.error("Error testing database connection:", err);
  } else {
    console.log("Database connection test successful:", results[0].solution);
  }
});

// Serve static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add_flower", (req, res) => {
  const { sepal_length, sepal_width, petal_length, petal_width, flower_type } = req.body;

  if (!sepal_length || !sepal_width || !petal_length || !petal_width || !flower_type) {
    console.error("Missing flower data:", req.body);
    return res.status(400).json({ message: "Please provide all the flower details." });
  }

  const sql = "INSERT INTO Flowers (sepal_length, sepal_width, petal_length, petal_width, flower_type) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [sepal_length, sepal_width, petal_length, petal_width, flower_type], (err, result) => {
    if (err) {
      console.error("SQL Error:", err.message); // Enhanced error logging
      console.error("Request Data:", req.body); // Log the received data
      return res.status(500).json({ message: "Error adding flower data.", error: err.message });
    }
    res.status(200).json({ message: "Flower data added successfully!" });
  });
});

app.post("/add_category", (req, res) => {
  const { flower_type } = req.body;

  if (!flower_type) {
    return res.status(400).json({ message: "Flower category is required." });
  }

  const sql = "INSERT INTO Categories (flower_type) VALUES (?)";

  db.query(sql, [flower_type], (err) => {
    if (err) {
      console.error("Error adding flower category:", err);
      res.status(500).json({ message: "Error adding flower category.", error: err.message });
    } else {
      res.status(200).json({ message: "Flower category added successfully!" });
    }
  });
});

app.get("/get_categories", (req, res) => {
  const sql = "SELECT flower_type FROM Categories";

  db.query(sql, (err, results) => {
      if (err) {
          console.error("Error fetching categories:", err);
          res.status(500).json({ message: "Error fetching categories.", error: err.message });
      } else {
          res.status(200).json(results);
      }
  });
});

app.get("/get_flowers", (req, res) => {
  const sql = "SELECT * FROM Flowers";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching flower data:", err);
      res.status(500).json({ message: "Error fetching flower data.", error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

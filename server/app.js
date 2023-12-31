const express = require("express");
const mongoose = require("mongoose");

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour parser le corps des requêtes en JSON et en données de formulaire URL-encoded
// Remplacement body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@datatbase1.thceu56.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

module.exports = app;

javascript
// Require dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Apply middleware functions
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
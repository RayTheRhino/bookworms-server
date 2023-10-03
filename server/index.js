const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/config/db');

//configurtions
const port = 3001;
app.use(express.json());

app.use(cors());

// Routers
const userRouter = require('./src/routes/userRourer');
app.use("/user",userRouter);


// Start the server
db.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Close the MongoDB connection when the Node.js process exits
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

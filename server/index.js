const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/config/db');
const cookieParser = require('cookie-parser');

//configurtions
const port = 3001;

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Routers
const userRouter = require('./src/routes/userRourer');
const commentRouter = require('./src/routes/commentRouter');


// Calls for routes
app.use("/user",userRouter);
app.use("/comment",commentRouter);


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


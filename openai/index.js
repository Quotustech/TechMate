// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //
const app = express();
const port = 5000; // Change this to your desired port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatRoutes = require('./chat/router');


app.use(bodyParser.json());

// Use the cors middleware to allow cross-origin requests from all origins
app.use(cors());
app.use(chatRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

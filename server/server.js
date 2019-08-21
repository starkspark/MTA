const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const pool = require('../database/db');
const { addUser, getMTAData } = require('./controller');
const bodyparser = require('body-parser');

//this is used to handle CORS issue
app.use(cors());
//this is the test route for the proof of concept
app.get('/test', getMTAData, (req, res) => {
  res.send({test: 'We out here!!!'});
});
//create a route for adding a user
app.post('/test', addUser, (req, res) => {
  res.send('We successfully added a user');
});

app.listen(3000, () => console.log('App is listening on port 3000'));
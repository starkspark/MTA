const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const pool = require('../database/db');
const { getUserInfo, getMTAData, addUserToDB } = require('./controller');
const bodyParser = require('body-parser')

//this is used to handle CORS issue
app.use(cors());
//using body parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
//this is the test route for the proof of concept
app.get('/test', getMTAData, (req, res) => {
  res.send({test: 'We out here!!!'});
});
//create a route for getting user info & adding the user's number to the database at the appropriate table
app.post('/test', getUserInfo, addUserToDB, (req, res) => {
  res.send('We successfully added a user');
});

app.listen(3000, () => console.log('App is listening on port 3000'));
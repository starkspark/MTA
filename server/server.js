const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const pool = require('../database/db');
<<<<<<< HEAD
const { addUser, getMTAData } = require('./controller');
const bodyparser = require('body-parser');

=======
const bodyParser = require('body-parser')


pool.query('INSERT INTO a (phone) VALUES (3475556932)', (err, res) => {
  if (err) console.log(err);
  // console.log('inside server query');
})
>>>>>>> 005e38470498227d5abd0913b0627a3883eb3106
//this is used to handle CORS issue
app.use(cors());
//using body parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
//this is the test route for the proof of concept
<<<<<<< HEAD
app.get('/test', getMTAData, (req, res) => {
  res.send({test: 'We out here!!!'});
});
//create a route for adding a user
app.post('/test', addUser, (req, res) => {
  res.send('We successfully added a user');
});
=======
app.get('/test', (req, res) => {
  //used request module to fetch the XML with all of the updated delays for MTA
  request('http://web.mta.info/status/ServiceStatusSubway.xml', (error, response, body) => {
    //if error, handle and report error
    if (error) console.log(`Error: ${error}`);
    //this variable stores the converted XML data as a JSON object
    let JSON = convert.xml2js(body, { compact: false });
    //reassigned JSON variable to access it's nested property
    //this brings us to the PTSITUATIONELEMENT property
    JSON = JSON.elements[0].elements[0].elements[1].elements[2].elements;
    //this variable stores the object that will have all lines affected by delays
    const lineTracker = {};
    //iterated over JSON array to access each PTSITUATIONELEMENT
    JSON.forEach((situation) => {
      //this variable stores the reference to the Affected Vehicle Journey property
      //it is an array
      let journey = situation.elements[10].elements[0].elements;
      //iterated over the array stored at the Affected Vehicle Journey property
      journey.forEach(line => {
        //this variable stores the reference to the name of the line affected by delays
        let train = line.elements[0].elements[0].text;
        //this variable stores the actual letter of the train
        train = train[train.length - 1];
        //this conditional asks if the affected train exists in the lineTracker object
        //if it is not, we add it to it
        if (!lineTracker[train]) lineTracker[train] = true;
      })
    });
    res.send(lineTracker);
  })
  });
app.post('/test', (req,res)=>{
  console.log('reqdotbody',req.body)
  console.log('we hit test post')
  res.send('dog food')
})
>>>>>>> 005e38470498227d5abd0913b0627a3883eb3106

app.listen(3000, () => console.log('App is listening on port 3000'));
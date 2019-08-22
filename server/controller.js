const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const convert = require('xml-js');
const pool = require('../database/db');
// twilio 
const accountSid = 'AC531de9b2edc5ebe1dfc689bda54d8027';
const authToken = '45d93302484b8600d1c606563d3d3c24';
const client = require('twilio')(accountSid, authToken);
// this object will store the previous delayed lines
const delayedNums = {};

function delayedlines(arrOfLines, msg){
  // iterate through array
  arrOfLines.forEach((line, index) => {
    //add line to delayedNums
    delayedNums[line] = true;
      let sqlQuery = `SELECT (phone) FROM line_${line}`
      // pool.query each element
      pool.query(sqlQuery, (err, result) => {
        if (result.rows){
          //query table of the curr element
          //ask for all phone #s from that table
          // iterate through new array
          // console.log(result.rows)
          result.rows.forEach(element => {
            // console.log(element)
            // per #, invoke the twilio function
            client.messages
              .create({
                body: msg[index],
                from: '+19292051663',
                to: element.phone
              })
              .then(message => console.log(message.sid));
          })
      }
    })
  })
  console.log(`This is the previous set of: ${delayedNums}`);
}

module.exports = {
  getMTAData: (req, res, next) => {
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
      // if (JSON){
        JSON.forEach((situation) => {
          //this variable stores the reference to the Affected Vehicle Journey property
          //it is an array
          let journey = situation.elements[10].elements[0].elements;
          let summary = situation.elements[4].elements[0].text;
          //iterated over the array stored at the Affected Vehicle Journey property
          journey.forEach(line => {
            //this variable stores the reference to the name of the line affected by delays
            let train = line.elements[0].elements[0].text;
            //this variable stores the actual letter of the train
            if(train[train.length - 2].toLowerCase() === 's'){
              train = train[train.length - 2].toLowerCase();
            }else{
              train = train[train.length - 1].toLowerCase();
            }
            //this conditional asks if the affected train exists in the lineTracker object
            //if it is not, we add it to it
            if (!lineTracker[train]) lineTracker[train] = summary;
          })
        });
      // } else {
      //   let journey = 'null';
      //   summary = "Yay! No delays on your line(s)";
      //   lineTracker[journey] = summary;
      // }
      // res.locals.delayedLines = Object.keys(lineTracker);
      
      // console.log(Object.keys(lineTracker));
      console.log(lineTracker);
      let keys = Object.keys(lineTracker);
      let values = Object.values(lineTracker);
      delayedlines(keys, values);
    })
  },
  getUserInfo: (req, res, next) => {
    // access req.body to get the user's number and the line to associate with them
    res.locals.phone = req.body.phone;
    res.locals.lines = req.body.lines;
    next();
  },
  addUserToDB: (req, res, next) => {
    //access res.locals for the phone number and lines
    const phonenumber = res.locals.phone;
    const lines = res.locals.lines;
    //iterate over array of lines
    lines.forEach(line => {
      const sqlQuery = `INSERT INTO line_${line} (phone) VALUES (${phonenumber})`;
      //insert the number to the appropriate table(s)
      pool.query(sqlQuery2, (error, result) => {
        if (error) console.log(`Error: ${error}`);
        else console.log(result, '***');
      })
    });
    //verify it was added
    next();
  }
}
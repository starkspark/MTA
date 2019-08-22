const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const convert = require('xml-js');
const pool = require('../database/db');

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
      JSON.forEach((situation) => {
        //this variable stores the reference to the Affected Vehicle Journey property
        //it is an array
        let journey = situation.elements[10].elements[0].elements;
        //iterated over the array stored at the Affected Vehicle Journey property
        journey.forEach(line => {
          //this variable stores the reference to the name of the line affected by delays
          let train = line.elements[0].elements[0].text;
          //this variable stores the actual letter of the train
          train = train[train.length - 1].toLowerCase();
          //this conditional asks if the affected train exists in the lineTracker object
          //if it is not, we add it to it
          if (!lineTracker[train]) lineTracker[train] = true;
        })
      });
      res.locals.delayedLines = Object.keys(lineTracker);
      next();
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
      const sqlQuery = `INSERT INTO n4 (phone) VALUES (${phonenumber})`;
      //insert the number to the appropriate table(s)
      pool.query(sqlQuery, (error, result) => {
        if (error) console.log(`Error: ${error}`);
        else console.log(result, '***');
      })
    });
    //verify it was added
    next();
  }
}
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

app.use(cors());

app.get('/test', (req, res) => {
  request('http://datamine.mta.info/mta_esi.php?key=dbc2942f56ccc6bb984903803264f490', (error, response, body) => {
    if (error) console.log("shit is fucked up");
    // console.log(response, '***');
    console.log(body, 'XXX');
    res.send(JSON.stringify(response));
  })
});

app.listen(3000, () => console.log('App is listening on port 3000'));
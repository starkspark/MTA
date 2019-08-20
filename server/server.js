const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

app.use(cors());

// 'http://datamine.mta.info/mta_esi.php?key=dbc2942f56ccc6bb984903803264f490&feed_id=2'

app.get('/test', (req, res) => {
  const requestSettings = {
    method: 'GET',
    url: 'http://datamine.mta.info/mta_esi.php?key=dbc2942f56ccc6bb984903803264f490&feed_id=2',
    encoding: null
  };
  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(GtfsRealtimeBindings, '***');
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      res.send(feed.entity);
      // feed.entity.forEach(function (entity) {
      //   if (entity.tripUpdate) {
      //     console.log(entity.tripUpdate);
      //   }
      // });
      // console.log(feed.entity[0]);
    }
  });
});

app.listen(3000, () => console.log('App is listening on port 3000'));
const accountSid = 'AC531de9b2edc5ebe1dfc689bda54d8027';
const authToken = '45d93302484b8600d1c606563d3d3c24';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'PLACE FETCH DELAYS INFO HERE',
     from: '+19292051663',
     to: 'PLACE NUMBER FOR DB HERE'
   })
  .then(message => console.log(message.sid));

module.exports = client;
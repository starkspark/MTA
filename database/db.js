// used require directive to import postgresQL module into file
const pg = require('pg');
// uri is the uri for the database on ElephantQL
const uri = 'postgres://zluoskut:2wXOgERV2hFxySyiNXmkaUfSRYNcXZ64@isilo.db.elephantsql.com:5432/zluoskut';
// pool is assigned the object returned from invoking Pool constructor on 'pg' module
const pool = new pg.Pool({connectionString: uri});
// this is where we actually connect to the database
pool.connect((err, db) => {
  //if err is not null, console.log that err
  if (err) console.log(err)
<<<<<<< HEAD
  // else, we just console.log that we successfully connected
  else console.log("Successfully connect ed to database.");
=======
  // console.log("I'm here!")
  
  db.query('SELECT * FROM a', (err, res) => {
    if (err) console.log(err);
    // console.log("in the query")
    // console.log(res)
  })
  // db.end();
>>>>>>> 005e38470498227d5abd0913b0627a3883eb3106
})
// we export the database so we can access it anywhere in our file system
module.exports = pool;
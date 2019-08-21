const pg = require('pg');
const uri = 'postgres://zluoskut:2wXOgERV2hFxySyiNXmkaUfSRYNcXZ64@isilo.db.elephantsql.com:5432/zluoskut';
const pool = new pg.Pool({connectionString: uri});

pool.connect((err, db) => {
  if (err) console.log(err)
  // console.log("I'm here!")
  
  db.query('SELECT * FROM a', (err, res) => {
    if (err) console.log(err);
    // console.log("in the query")
    // console.log(res)
  })
  // db.end();
})

module.exports = pool;
var express = require('express');
var router = express.Router();
const sql = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  sql.query('SELECT * FROM CVItems', (err, rows, fields) => {
    if(err) throw err;

    res.json(rows);
  });

  //res.render('index', { title: 'Express' });
  // put in the get for the proper stuff here
});

router.delete('/itemId/:itemId/', (req, res, next) => {
  const {itemId} = req.params;
  const queryText = `DELETE FROM CVItems WHERE Id = ${parseInt(itemId)}`;

  sql.query(queryText, (err, rows, fields) => {
    if (err) throw err;
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
const sql = require('../db');
const { response, query } = require('express');

// GET
router.get('/', function(req, res, next) {
  sql.query('SELECT * FROM CVItems', (err, rows, fields) => {
    if(err) throw err;

    res.status = 200;
    res.json(rows);
  });
});

// DELETE
router.delete('/itemId/:itemId/', (req, res, next) => {
  const {itemId} = req.params;
  const queryText = `DELETE FROM CVItems WHERE Id = ${parseInt(itemId)}`;

  sql.query(queryText, (err, rows, fields) => {
    if (err) throw err;
  })

  res.sendStatus(200);
});

// POST
router.post('/', (req, res, next) => {
  sql.query("INSERT INTO CVItems (Title, Description) VALUES (?,?);",
    [req.body['Title'], 
    req.body['Description']],
    
    (err, rows, fields) => {
    if (err) throw err;
  })

  res.sendStatus(200);
})

module.exports = router;

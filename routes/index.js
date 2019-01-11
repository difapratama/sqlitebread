var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// initialize app

var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

//connecting to the db
let db = new sqlite3.Database('data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('Connected Success');
})

//creating table
db.run('CREATE TABLE IF NOT EXISTS data (string text, integer integer, float integer, date text, boolean text)');

// to get file
router.get('/', function (req, res) {
  res.render('index')
});

// Menerima data input from user
router.post('/add', urlencodedParser, function (req, res) {
  // res.send(req.body.string);

  // inserting data
  let sql = `INSERT INTO data(string, integer, float, date, boolean) VALUES (?,?,?,?,?)`
  db.run(sql, req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean, function (err) {
    if (err) {
      console.log(err.message);
    }
    console.log(`data berhasil di masukkan`);
  });
  res.redirect('/');
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// router.post('/', function (req, res, next) {
//   db.all('select * from data', (err, result) => {
//     console.log(result);
//     res.render('index', {
//       sql: req.body.sql
//     });
//   });
//   res.render('add');
// });

router.get('/add', function (req, res, next) {
  res.render('add');
});

router.get('/edit', function (req, res, next) {
  res.render('edit')
});

router.post('/edit', function (req, res, next) {
  // let id = req.params.id;
  res.render('edit')
});

module.exports = router;
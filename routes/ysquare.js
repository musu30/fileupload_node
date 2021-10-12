var multer = require('multer')
var db = require('../startup/database');
var path = require('path');
var fs = require('fs');
var express = require('express');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
var upload = multer({ storage: storage });
var router = express.Router();




router.get('/get_details/:id', (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM file_upload_table WHERE id=${id}`;
  var query = db.query(sql, function (err, result) {
    return res.send({
      status: 'success', values: result[0]
    });
  });
});

router.get('/', (req, res) => {
  res.send('Node js file upload rest apis');
});

router.post('/upload-file', upload.any(), (req, res, next) => {
  const file = req.files && req.files[0].path;
  const name = req.body.name;
  if (!file) {
    return res.status(400).send({
      status: "failed",
      message: 'Upload File Required'
    });
  }
  const data = {
    name: name,
    file_url: file,
    added_date: Date(),
    file_status: 1
  }
  const sql = "INSERT INTO file_upload_table SET ?";
  var query = db.query(sql, data, function (err, result) {
    return res.send({ message: 'File uploaded successfully.', values: { id: result.insertId, name: name } });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();


const { selectAllFromTable,
selectAllFromTableByFieldValue,
deleteItemFromTable,
updateNameKeyObject,
insertNameKeyObject,
deleteNameKeyObject,
getAllFromTable,
getStructure} = require('./../db/');



router.param('id', function(req, res, next, id) {
  req.itemId = id;
  console.log(req.body);
  let structure = getStructure(req);
  req[structure.jsonName] = req.body;
  next();
});

router.param('path', function(req, res, next, id) {
  let test = id;
  req.pathCall = test.replace(/\//g,"");
  next();
});

/* GET users listing. */
router.get('/:path', function(req, res, next) {
  getAllFromTable(req, res, next)
});

router.put('/:path/:id', function(req, res, next) {
  console.log("Update WL");
  updateNameKeyObject(req, res, next)
});

router.post('/:path', function(req, res, next) {
  console.log("Insert WL");
  insertNameKeyObject(req, res, next)
});

router.delete('/:path/:id', function(req, res, next) {
  console.log("Delete WL");
  deleteNameKeyObject(req, res, next)
});


router.post('/', function(req, res, next) {
  res.send('CreateUser');
});

/* Methods with id */
router.get('/:userId', function(req, res, next) {
  res.send(req.user);
});

router.put('/:userId', function(req, res, next) {
  res.send('Update a User');
});

router.delete('/:userId', function(req, res, next) {
  res.send('Delete User');
});

module.exports = router;

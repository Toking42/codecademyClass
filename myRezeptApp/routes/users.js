var express = require('express');
var router = express.Router();



router.param('userId', function(req, res, next, id) {
  req.userId = id;
  req.user = {id: id, name:'Test '+id};
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

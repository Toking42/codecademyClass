const express = require('express');
const router = express.Router({mergeParams:true});

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const DEBUG = false;

router.param('durationId', function(req, res, next, id) {
  req.durationId = id;
  let query = " Select rezept_dauer.id,	dauer, name, sort, beschreibung "+
              " FROM rezept_dauer "+
              " WHERE rezept =$1 AND rezept_dauer.id = $2";
  if(DEBUG) console.log(query);
  req.db.query(query, [req.recepieId, req.durationId], (err, rs) => {
    if (err) {
      return next(err)
    }
    req.recepieDuration = rs.rows[0];
    next();
  })
});

/* GET recepieDurations listing. */
router.get('/', function(req, res, next) {
  let query = " Select rezept_dauer.id,	dauer, name, sort, beschreibung "+
              " FROM rezept_dauer "+
              " WHERE rezept =$1";
  if(DEBUG) console.log(query);
  req.db.query(query,[req.recepieId], (err, rs) => {
    if (err){
      next(err);
    } else {
      let result  = {};
      result['recepieDurations'] = rs.rows;
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  let recepieDuration = req.body.recepieDurations[0];
  if(!recepieDuration.dauer || !recepieDuration.name || !recepieDuration.sort) {
    return res.status(400).send("Wrong Params")
  }
    let query =  "INSERT INTO rezept_dauer (rezept, dauer, name, sort, beschreibung) "+
              " VALUES ($1, $2, $3, $4, $5)" +
              " returning *";
    let values = [req.recepieId, recepieDuration.dauer, recepieDuration.name, recepieDuration.sort, recepieDuration.beschreibung];

    if(DEBUG) console.log(query);

    req.db.query(query, values, (err, rs) => {
      if (err){
          next(err);
        } else {
          let result  = {};
          result['recepieDurations'] = rs.rows[0];
          res.status(200).json(result);
      }
    });
});

/* Methods with id */
router.get('/:durationId', function(req, res, next) {
  res.status(200).json(req.recepieDuration);
});

router.put('/:durationId', function(req, res, next) {
  let recepieDuration = req.body.recepieDurations[0];
  let query =  "UPDATE rezept_dauer set name = $1, dauer = $2, sort =$3, beschreibung =$4"+
            " WHERE id = "+req.durationId +
            " returning *";
  let values = [recepieDuration.name, recepieDuration.dauer, recepieDuration.sort, recepieDuration.beschreibung];

  if(DEBUG) console.log(query);
  req.db.query(query, values, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        result['recepieDurations'] = rs.rows[0];
        res.status(200).json(result);
      }
  });
});

router.delete('/:durationId', function(req, res, next) {
  let query = "DELETE FROM rezept_dauer where id = $1;";
    req.db.query(query, [req.durationId], (err, rs) => {
      if (err) next(err)
    });
  res.status(204).send();
});

module.exports = router;

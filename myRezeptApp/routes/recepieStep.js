const express = require('express');
const router = express.Router({mergeParams:true});

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const DEBUG = false;

router.param('stepId', function(req, res, next, id) {
  req.stepId = id;
  let query = " Select rezept_schritt.id,	dauer, name, sort, beschreibung "+
              " FROM rezept_schritt "+
              " WHERE rezept =$1 AND rezept_schritt.id = $2";
  if(DEBUG) console.log(query);
  req.db.query(query, [req.recepieId, req.stepId], (err, rs) => {
    if (err) {
      return next(err)
    }
    req.recepieStep = rs.rows[0];
    next();
  })
});

/* GET recepieSteps listing. */
router.get('/', function(req, res, next) {
  let query = " Select rezept_schritt.id,	dauer, name, sort, beschreibung "+
              " FROM rezept_schritt "+
              " WHERE rezept =$1";
  if(DEBUG) console.log(query);
  req.db.query(query,[req.recepieId], (err, rs) => {
    if (err){
      next(err);
    } else {
      let result  = {};
      result['recepieSteps'] = rs.rows;
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  let recepieStep = req.body.recepieSteps[0];
  if(!recepieStep.dauer || !recepieStep.name || !recepieStep.sort) {
    return res.status(400).send("Wrong Params")
  }
    let query =  "INSERT INTO rezept_schritt (rezept, dauer, name, sort, beschreibung) "+
              " VALUES ($1, $2, $3, $4, $5)" +
              " returning *";
    let values = [req.recepieId, recepieStep.dauer, recepieStep.name, recepieStep.sort, recepieStep.beschreibung];

    if(DEBUG) console.log(query);

    req.db.query(query, values, (err, rs) => {
      if (err){
          next(err);
        } else {
          let result  = {};
          result['recepieSteps'] = rs.rows[0];
          res.status(200).json(result);
      }
    });
});

/* Methods with id */
router.get('/:stepId', function(req, res, next) {
  res.status(200).json(req.recepieStep);
});

router.put('/:stepId', function(req, res, next) {
  let recepieStep = req.body.recepieSteps[0];
  let query =  "UPDATE rezept_schritt set name = $1, dauer = $2, sort =$3, beschreibung =$4"+
            " WHERE id = "+req.stepId +
            " returning *";
  let values = [recepieStep.name, recepieStep.dauer, recepieStep.sort, recepieStep.beschreibung];

  if(DEBUG) console.log(query);
  req.db.query(query, values, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        result['recepieSteps'] = rs.rows[0];
        res.status(200).json(result);
      }
  });
});

router.delete('/:stepId', function(req, res, next) {
  let query = "DELETE FROM rezept_schritt where id = $1;";
    req.db.query(query, [req.stepId], (err, rs) => {
      if (err) next(err)
    });
  res.status(204).send();
});

module.exports = router;

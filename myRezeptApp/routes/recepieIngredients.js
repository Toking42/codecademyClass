const express = require('express');
const router = express.Router({mergeParams:true});

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const DEBUG = false;

router.param('ingredientId', function(req, res, next, id) {
  req.ingredientId = id;
  let query = " Select rezept_zutat.id,	rezept,	einheit, einheit.name as einheitname, einheit.schluessel as einheitschluessel , zutat, zutat.name as zutatname, menge "+
              " FROM rezept_zutat "+
              " JOIN zutat on zutat.id = zutat "+
              " JOIN einheit on einheit.id = einheit "+
              " WHERE rezept =$1 AND rezept_zutat.id = $2";
  if(DEBUG) console.log(query);
  req.db.query(query, [req.recepieId, req.ingredientId], (err, rs) => {
    if (err) {
      return next(err)
    }
    req.recepieIngredient = rs.rows[0];
    next();
  })
});

/* GET recepieIngredients listing. */
router.get('/', function(req, res, next) {
  let query = " Select rezept_zutat.id,	rezept,	einheit, einheit.name as einheitname, einheit.schluessel as einheitschluessel , zutat, zutat.name as zutatname, menge "+
              " FROM rezept_zutat "+
              " JOIN zutat on zutat.id = zutat "+
              " JOIN einheit on einheit.id = einheit "+
              " WHERE rezept =$1";
  if(DEBUG) console.log(query);
  req.db.query(query,[req.recepieId], (err, rs) => {
    if (err){
      next(err);
    } else {
      let result  = {};
      result['recepieIngredients'] = rs.rows;
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  let recepieIngredient = req.body.recepieIngredients[0];
  if(!recepieIngredient.zutat || !recepieIngredient.einheit || !recepieIngredient.menge) {
    return res.status(400).send("Wrong Params")
  }
    let query =  "INSERT INTO rezept_zutat (rezept, menge, einheit, zutat, beschreibung) "+
              " VALUES ($1, $2, $3, $4, $5)" +
              " returning *";
    let values = [req.recepieId, recepieIngredient.menge, recepieIngredient.einheit, recepieIngredient.zutat, recepieIngredient.beschreibung];

    if(DEBUG) console.log(query);

    req.db.query(query, values, (err, rs) => {
      if (err){
          next(err);
        } else {
          let result  = {};
          result['recepieIngredients'] = rs.rows[0];
          res.status(200).json(result);
      }
    });
});

/* Methods with id */
router.get('/:ingredientId', function(req, res, next) {
  res.status(200).json(req.recepieIngredient);
});

router.put('/:ingredientId', function(req, res, next) {
  let recepieIngredient = req.body.recepieIngredients[0];
  let query =  "UPDATE rezept_zutat set menge = $1, einheit = $2, zutat =$3, beschreibung =$4"+
            " WHERE id = "+req.ingredientId +
            " returning *";
  let values = [recepieIngredient.menge, recepieIngredient.einheit, recepieIngredient.zutat, recepieIngredient.beschreibung];

  if(DEBUG) console.log(query);
  req.db.query(query, values, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        result['recepieIngredients'] = rs.rows[0];
        res.status(200).json(result);
      }
  });
});

router.delete('/:ingredientId', function(req, res, next) {
  let query = "DELETE FROM rezept_zutat where id = $1;";
    req.db.query(query, [req.ingredientId], (err, rs) => {
      if (err) next(err)
    });
  res.status(204).send();
});

module.exports = router;

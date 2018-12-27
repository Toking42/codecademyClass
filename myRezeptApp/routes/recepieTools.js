const express = require('express');
const router = express.Router({mergeParams:true});

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const DEBUG = false;

router.param('toolId', function(req, res, next, id) {
  req.toolId = id;
  let query = " Select rezept_geraet.id,	rezept,	einheit, einheit.name as einheitname, einheit.schluessel as einheitschluessel ,"+
              " geraet, geraet.name as geraetname, menge, rezept_geraet.beschreibung  "+
              " FROM rezept_geraet "+
              " JOIN geraet on geraet.id = geraet "+
              " JOIN einheit on einheit.id = einheit "+
              " WHERE rezept =$1 AND rezept_geraet.id = $2";
  if(DEBUG) console.log(query);
  req.db.query(query, [req.recepieId, req.toolId], (err, rs) => {
    if (err) {
      return next(err)
    }
    req.recepieTool = rs.rows[0];
    next();
  })
});

/* GET recepieTools listing. */
router.get('/', function(req, res, next) {
  let query = " Select rezept_geraet.id,	rezept,	einheit, einheit.name as einheitname, einheit.schluessel as einheitschluessel , "+
              " geraet, geraet.name as geraetname, menge, rezept_geraet.beschreibung "+
              " FROM rezept_geraet "+
              " JOIN geraet on geraet.id = geraet "+
              " JOIN einheit on einheit.id = einheit "+
              " WHERE rezept =$1";
  if(DEBUG) console.log(query);
  req.db.query(query,[req.recepieId], (err, rs) => {
    if (err){
      next(err);
    } else {
      let result  = {};
      result['recepieTools'] = rs.rows;
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  let recepieTool = req.body.recepieTools[0];
  if(!recepieTool.geraet || !recepieTool.einheit || !recepieTool.menge) {
    return res.status(400).send("Wrong Params")
  }
    let query =  "INSERT INTO rezept_geraet (rezept, menge, einheit, geraet, beschreibung) "+
              " VALUES ($1, $2, $3, $4, $5)" +
              " returning *";
    let values = [req.recepieId, recepieTool.menge, recepieTool.einheit, recepieTool.geraet, recepieTool.beschreibung];

    if(DEBUG) console.log(query);

    req.db.query(query, values, (err, rs) => {
      if (err){
          next(err);
        } else {
          let result  = {};
          result['recepieTools'] = rs.rows[0];
          res.status(200).json(result);
      }
    });
});

/* Methods with id */
router.get('/:toolId', function(req, res, next) {
  res.status(200).json(req.recepieTool);
});

router.put('/:toolId', function(req, res, next) {
  let recepieTool = req.body.recepieTools[0];
  let query =  "UPDATE rezept_geraet set menge = $1, einheit = $2, geraet =$3, beschreibung =$4"+
            " WHERE id = "+req.toolId +
            " returning *";
  let values = [recepieTool.menge, recepieTool.einheit, recepieTool.geraet, recepieTool.beschreibung];

  if(DEBUG) console.log(query);
  req.db.query(query, values, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        result['recepieTools'] = rs.rows[0];
        res.status(200).json(result);
      }
  });
});

router.delete('/:toolId', function(req, res, next) {
  let query = "DELETE FROM rezept_geraet where id = $1;";
    req.db.query(query, [req.toolId], (err, rs) => {
      if (err) next(err)
    });
  res.status(204).send();
});

module.exports = router;

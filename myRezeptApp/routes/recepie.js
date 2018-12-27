const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const ingredientsRouter = require('./recepieIngredients');
const toolsRouter = require('./recepieTools');
const durationsRouter = require('./recepieDurations');


const DEBUG = false;



router.param('recepieId', function(req, res, next, id) {
  req.recepieId = id;
  let query = " Select id, schluessel, schwierigkeit, name, portionen, nutzer, beschreibung, "+
              " (SELECT sum(dauer) FROM rezept_dauer WHERE rezept = $1) as overall_duration "+
              " FROM rezept ";
  if(isNaN(req.recepieId)) {
    query += " WHERE schluessel ilike '$1'";
  } else {
    query += " WHERE id = $1";
  }
  if(DEBUG) console.log(query);
  req.db.query(query, [req.recepieId], (err, rs) => {
    if (err) {
      return next(err)
    }
    req.recepie = rs.rows[0];
    next();
  })
});

router.use('/:recepieId/ingredients/', ingredientsRouter);
router.use('/:recepieId/tools/', toolsRouter);
router.use('/:recepieId/durations/', durationsRouter);

/* GET recepies listing. */
router.get('/', function(req, res, next) {
  let query =  "Select * FROM rezept ";
  if(DEBUG) console.log(query);
  req.db.query(query, (err, rs) => {
    if (err){
      next(err);
    } else {
      let result  = {};
      result['recepies'] = rs.rows;
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  let recepie = req.body.recepies[0];
  if(!recepie.schluessel) recepie.schluessel = randToken.uid(8);
  if(!recepie.schwierigkeit || !recepie.name || !recepie.nutzer) {
    return res.status(400).send("Wrong Params")
  }


    let query =  "INSERT INTO rezept (nutzer, name, schluessel, schwierigkeit, portionen, beschreibung) "+
              " VALUES ($1, $2, $3, $4, $5, $6)" +
              " returning *";
    let values = [recepie.nutzer, recepie.name, recepie.schluessel, recepie.schwierigkeit, recepie.portionen, recepie.beschreibung];

    if(DEBUG) console.log(query);

    req.db.query(query, values, (err, rs) => {
        if(err && err.constraint && err.constraint ==='idx_rezept_email') {
          return res.status(409).send("Email-adress already in use");
        } else if (err){
          next(err);
        } else {
          let result  = {};
          result['recepies'] = rs.rows[0];
          res.status(200).json(result);
      }
    });
});

/* Methods with id */
router.get('/:recepieId', function(req, res, next) {
  res.status(200).json(req.recepie);
});

router.put('/:recepieId', function(req, res, next) {
  let recepie = req.body.recepies[0];
  let query =  "UPDATE rezept set name = '"+recepie.name+"', email='"+recepie.email+"', beschreibung = '"+recepie.beschreibung+"' "+
            " WHERE id = "+req.recepieId +
            " returning *";
  if(DEBUG) console.log(query);
  req.db.query(query, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        let recepie = {};
        recepie['name'] = rs.rows[0].name;
        recepie['email'] = rs.rows[0].email;
        recepie['id'] = rs.rows[0].id;
        recepie['beschreibung'] = rs.rows[0].beschreibung;
        result['recepies'] = recepie;
        res.status(200).json(result);
      }
  });
});

router.put('/:recepieId/changepasswd', function(req, res, next) {
  let recepie = req.body.recepies[0];

  let oldPasswd = req.body.recepies[0]['oldPasswd'];
  let newPasswd = req.body.recepies[0]['newPasswd'];

  if(!oldPasswd || !newPasswd) {
    return res.status(400).send("Wrong Params");
  }

  bcrypt.compare(oldPasswd, req.recepie.kennwort, function(err, checkResult) {
    console.log("Compare: "+oldPasswd+" WITH "+req.recepie.kennwort+" Result:");
    console.log(checkResult);
    if(checkResult) {
      bcrypt.hash('myPassword', 10, function(err, hash) {
        let query =  "UPDATE rezept set kennwort = '"+hash+"'"+
                  " WHERE id = "+req.recepieId +
                  " returning *";
        req.db.query(query, (err, rs) => {
          if (err){
            next(err);
          } else {
            let result  = {};
            let recepie = {};
            recepie['name'] = rs.rows[0].name;
            recepie['email'] = rs.rows[0].email;
            recepie['id'] = rs.rows[0].id;
            recepie['beschreibung'] = rs.rows[0].beschreibung;
            result['recepies'] = recepie;
            console.log(result);
            res.status(200).json(result);
          }
        });
      });
    } else {
      console.log(err);
     res.status(409).send("Old Passwd didn't match");
    }
  });

});


router.delete('/:recepieId', function(req, res, next) {
  let query = [
    "DELETE FROM rezept_favorit where rezept = $1;",
    "DELETE FROM rezept_kommentar where rezept = $1;",
    "DELETE FROM rezept_rolle where rezept = $1;",
    "DELETE FROM rezept where id = $1;"
  ];
  for(let i = 0; i< query.length; i++) {
    req.db.query(query[i], [req.recepieId], (err, rs) => {
      if (err) next(err)

    });
  }
  res.status(204).send();
});

module.exports = router;

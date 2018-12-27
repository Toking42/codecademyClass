const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const DEBUG = false;



router.param('userId', function(req, res, next, id) {
  req.userId = id;
  let query =  "Select id, name, email, kennwort, beschreibung FROM nutzer WHERE id ="+req.userId;
  if(isNaN(req.userId)) query = "Select id, name, email, kennwort, beschreibung FROM nutzer WHERE email ilike '"+req.userId+"'";
  if(DEBUG) console.log(query);
  req.db.connect((err, client, done) => {
    if (err) next(err);
    else {
    client.query(query, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        req.user =  rs.rows[0];
        next();
      }
      });
      done();
    }
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query =  "Select id, name, email, beschreibung FROM nutzer ";
  if(DEBUG) console.log(query);
  req.db.connect((err, client, done) => {
    if (err) next(err);
    else {
    client.query(query, (err, rs) => {
      if (err){
        next(err);
      } else {
        let result  = {};
        result['users'] = rs.rows;
        console.log(result);
        res.status(200).json(result);
      }
      });
      done();
    }
  })
});

router.post('/', function(req, res, next) {
  let user = req.body.users[0];
  console.log('--> Add User');
  console.log(user);
  bcrypt.hash(user.kennwort, 10, function(err, hash) {
    let query =  "INSERT INTO nutzer ( name, email, kennwort, beschreibung) "+
            " VALUES ('"+user.name+"','"+user.email+"','"+hash+"','"+user.beschreibung+"')" +
            " returning *";
            if(DEBUG) console.log(query);
    req.db.connect((err, client, done) => {
      if (err) next(err);
      else {
      client.query(query, (err, rs) => {
        if(err && err.constraint && err.constraint ==='idx_nutzer_email') {
          return res.status(409).send("Email-adress already in use");
        } else if (err){
          next(err);
        } else {
          let result  = {};
          let user = {};
          user['name'] = rs.rows[0].name;
          user['email'] = rs.rows[0].email;
          user['id'] = rs.rows[0].id;
          user['beschreibung'] = rs.rows[0].beschreibung;
          result['users'] = user;
          console.log(result);
          res.status(200).json(result);
        }
        });
        done();
      }
    })

  });
});

/* Methods with id */
router.get('/:userId', function(req, res, next) {
  let user = {};
  let result = {};
  user['name'] = req.user.name;
  user['email'] = req.user.email;
  user['id'] = req.user.id;
  user['beschreibung'] = req.user.beschreibung;
  result['users'] = user;
  res.status(200).json(result);
});

router.put('/:userId', function(req, res, next) {
  let user = req.body.users[0];
  console.log('--> Update User');
  console.log(user);
  let query =  "UPDATE nutzer set name = '"+user.name+"', email='"+user.email+"', beschreibung = '"+user.beschreibung+"' "+
            " WHERE id = "+req.userId +
            " returning *";
            if(DEBUG) console.log(query);
    req.db.connect((err, client, done) => {
      if (err) next(err);
      else {
      client.query(query, (err, rs) => {
        if(err && err.constraint && err.constraint ==='idx_nutzer_email') {
          return res.status(409).send("Email-adress already in use");
        } else if (err){
          next(err);
        } else {
          let result  = {};
          let user = {};
          user['name'] = rs.rows[0].name;
          user['email'] = rs.rows[0].email;
          user['id'] = rs.rows[0].id;
          user['beschreibung'] = rs.rows[0].beschreibung;
          result['users'] = user;
          console.log(result);
          res.status(200).json(result);
        }
        });
        done();
      }
    });
});

router.put('/:userId/changepasswd', function(req, res, next) {
  let user = req.body.users[0];

  let oldPasswd = req.body.users[0]['oldPasswd'];
  let newPasswd = req.body.users[0]['newPasswd'];

  if(!oldPasswd || !newPasswd) {
    return res.status(400).send("Wrong Params");
  }

  bcrypt.compare(oldPasswd, req.user.kennwort, function(err, checkResult) {
    console.log("Compare: "+oldPasswd+" WITH "+req.user.kennwort+" Result:");
    console.log(checkResult);
    if(checkResult) {
      bcrypt.hash('myPassword', 10, function(err, hash) {
        let query =  "UPDATE nutzer set kennwort = '"+hash+"'"+
                  " WHERE id = "+req.userId +
                  " returning *";
                  req.db.connect((err, client, done) => {
                    if (err) next(err);
                    else {
                    client.query(query, (err, rs) => {
                      if (err){
                        next(err);
                      } else {
                        let result  = {};
                        let user = {};
                        user['name'] = rs.rows[0].name;
                        user['email'] = rs.rows[0].email;
                        user['id'] = rs.rows[0].id;
                        user['beschreibung'] = rs.rows[0].beschreibung;
                        result['users'] = user;
                        console.log(result);
                        res.status(200).json(result);
                      }
                      });
                      done();
                    }
                  });
      });
    } else {
      console.log(err);
     res.status(409).send("Old Passwd didn't match");
    }
  });

});


router.delete('/:userId', function(req, res, next) {
  let query = "DELETE FROM nutzer where id = $1;";

  req.db.connect((err, client, done) => {
    if (err) next(err);
    else {
      client.query(query, [req.userId], (err, rs) => {
        console.log("after query");
        console.log(err);
        console.log(rs);
        if (err) next(err)
        else res.status(204).send();
      });
      done();
    }
  });
});

module.exports = router;

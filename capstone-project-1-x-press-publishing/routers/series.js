const express = require('express');
const sqlite3 = require('sqlite3');

const seriesRouter = express.Router({mergeParams:true});
const issueRouter = require('./issue');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


const {getQueryAllFromTable, getQueryItemFromTable, getQueryIusse4Serie} = require('./../sql');

const tableName = 'Series';
const DEBUG = true;;


seriesRouter.use('/:seriesId/issues', issueRouter);

seriesRouter.param('seriesId' , function (req, res, next, id) {
  let query = getQueryItemFromTable(tableName, id);
  db.get(query, (err, row) => {
    if(err) {
          next(err);
    } else if(row) {
      req.series = row;
      req.seriesId = id;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});


seriesRouter.get('/', (req, res, next) => {
  db.all(getQueryAllFromTable(tableName), function (err, rows) {
        if(err) {
          next(err);
        } else {
          res.status(200).json({series:rows});
        }
  });
})
// Insert
seriesRouter.post('/', (req, res, next) => {
  let newItem =req.body.series;

  if(!isValidItem(newItem)) {
    return res.status(400).send('Wrong params');
  }

  db.run("INSERT into Series (name, description) VALUES ($name, $description);",
  {
    $name : newItem.name,
    $description: newItem.description
  }, function (err) {
      if(err) console.log(err);
      else {
        db.get("SELECT * FROM Series where id = $id",{$id:this.lastID}, (err, row) => {
          if(row) res.status(201).send({series:row});
          else res.sendStatus(404);
        })
      }
    }
  );

})


seriesRouter.get('/:seriesId', (req, res, next) => {
  res.status(200).send({series:req.series});
})

seriesRouter.put('/:seriesId', (req, res, next) => {
  if(!isValidItem(req.body.series)) {
    return res.status(400).send('Wrong params');
  } else {
    let newItem = req.body.series;
    db.run("UPDATE Series set name = $name , description = $description WHERE id = $id;",
    {
      $id:req.params.seriesId,
      $name : newItem.name,
      $description: newItem.description
    }, function (err) {
        if(err) console.log(err);
        else {
          db.get("SELECT * FROM Series where id = $id",{$id:req.params.seriesId}, (err, row) => {
            if(err) next(err);
            else if(row) {
              res.status(200).json({series:row});
            } else return res.status(404).send('Series not found');
          })
        }
      }
    )}

});


seriesRouter.delete('/:seriesId', (req, res, next) => {

  db.get(getQueryIusse4Serie(req.params.seriesId), (err, row) => {
    if(err) next(err);
    else if (row) {
        return res.status(400).send();
    } else {
      db.run("DELETE FROM Series WHERE id = $id;",
      {$id:req.params.seriesId}, function (err) {
          if(err) next(err);
          else res.status(204).send();
        });
    }
  });

});



const isValidItem = (newItem) => {
  if(newItem.name === undefined) return false;
  if(newItem.description === undefined) return false;
  return true;
}





module.exports = seriesRouter;

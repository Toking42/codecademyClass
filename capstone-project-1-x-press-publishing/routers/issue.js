const express = require('express');
const sqlite3 = require('sqlite3');

const issueRouter = express.Router({mergeParams:true});
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


const {getQueryAllFromTable, getQueryItemFromTable, getQueryIusse4Serie} = require('./../sql');

const tableName = 'Issue';
const DEBUG = true;;



issueRouter.param('issueId' , function (req, res, next, id) {
  let query = getQueryItemFromTable(tableName, id);

  db.get(query, (err, row) => {
    if(err) {
          next(err);
    } else if(row) {
      req.issue = row;
      req.issueId = id;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});


issueRouter.get('/', (req, res, next) => {
  db.all(getQueryIusse4Serie(req.params.seriesId), (err, rows) => {
    if(err) next(err);
    else if (rows) res.status(200).json({issues:rows});
    else res.status(200).json({issues:[]});
  });
})
// Insert
issueRouter.post('/', (req, res, next) => {
  let newItem =req.body.issue;
  newItem['seriesId'] =  req.seriesId;
  if(!isValidItem(newItem)) {
    return res.status(400).send('Wrong params');
  }

  db.run("INSERT into Issue (name, issue_number, publication_date, artist_id, series_id) "+
  "VALUES ($name, $issueNumber, $publicationDate, (SELECT id from Artist WHERE id = $artistId), $seriesId);",
  {
    $name: newItem.name,
    $issueNumber: newItem.issueNumber,
    $publicationDate: newItem.publicationDate,
    $artistId: newItem.artistId,
    $seriesId: newItem.seriesId
  }, function (err) {
      if(err) console.log(err);
      else {
        db.get("SELECT * FROM Issue where id = $id",{$id:this.lastID}, (err, row) => {
          if(row) res.status(201).send({issue:row});
          else res.sendStatus(404);
        })
      }
    }
  );

})


issueRouter.get('/:issueId', (req, res, next) => {
  res.status(200).send({issues:req.issue});
})

issueRouter.put('/:issueId', (req, res, next) => {
  let newItem = req.body.issue;
  newItem['seriesId'] = req.params.seriesId;
  if(!isValidItem(newItem)) {
    return res.status(400).send('Wrong params');
  } else {
    db.run('UPDATE Issue SET name = $name, issue_number = $issueNumber, ' +
        'publication_date = $publicationDate, artist_id = $artistId ' +
        'WHERE Issue.id = $issueId',
    {
      $name: newItem.name,
      $issueNumber: newItem.issueNumber,
      $publicationDate: newItem.publicationDate,
      $artistId: newItem.artistId,
      $issueId: req.params.issueId
    }, function (err) {
        if(err) console.log(err);
        else {
          db.get("SELECT * FROM Issue where id = $id",{$id:req.params.issueId}, (err, row) => {
            if(err) next(err);
            else if(row) {
              res.status(200).json({issue:row});
            } else return res.status(404).send('Series not found');
          })
        }
      }
    )}

});


issueRouter.delete('/:issueId', (req, res, next) => {

  db.get(getQueryIusse4Serie(req.params.issueId), (err, row) => {
    if(err) next(err);
    else if (row) {
        return res.status(400).send();
    } else {
      db.run("DELETE FROM Issue WHERE id = $id;",
      {$id:req.params.issueId}, function (err) {
          if(err) next(err);
          else res.status(204).send();
        });
    }
  });

});



const isValidItem = (newItem) => {
  if(newItem.name === undefined) return false;
  if(newItem.issueNumber === undefined) return false;
  if(newItem.publicationDate === undefined) return false;
  if(newItem.artistId === undefined) return false;
  if(newItem.seriesId === undefined) return false;
  return true;
}





module.exports = issueRouter;

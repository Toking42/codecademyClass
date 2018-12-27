const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const artistRouter = express.Router();

const {getQueryAllFromTable, getQueryItemFromTable, getQueryAllEmployedArtists} = require('./../sql');

const tableName = 'Artist';
const DEBUG = true;;



artistRouter.param('artistId' , function (req, res, next, id) {
  let query = getQueryItemFromTable(tableName, id);

  db.get(query, (err, row) => {
    if(err) {
      next(error);
    } else if (row) {
      req.artist = row;
      req.artistId = id;
      next();
    } else {
      res.status(404).send('Artist not found');
    }
  })


})


artistRouter.get('/', (req, res, next) => {
  db.all(getQueryAllEmployedArtists(tableName), function (err, rows) {
        if(err) {
          next(err);
        } else {
          res.status(200).json({artists: rows});
        }
      });
})

// Insert
artistRouter.post('/', (req, res, next) => {
  let newArtist =req.body.artist;
  newArtist.isCurrentlyEmployed = 1;

  if(!isValidArtist(newArtist, req)) {
    return res.status(400).send('Wrong params');
  }

  db.run("INSERT into Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed);",
  {
    $name : newArtist.name,
    $dateOfBirth: newArtist.dateOfBirth,
    $biography: newArtist.biography,
    $isCurrentlyEmployed: newArtist.isCurrentlyEmployed

  }, function (err) {
      if(err) console.log(err);
      else {
        db.get("SELECT * FROM Artist where id = $id",{$id:this.lastID}, (err, row) => {
          if(err) next(err);
          else if(row) res.status(201).send({artist:row});
          else return res.status(404).send('Artist not found');
        })
      }
    }
  );

})


artistRouter.get('/:artistId', (req, res, next) => {
  res.status(200).send({artist:req.artist});
})

// Udate artist
artistRouter.put('/:artistId', (req, res, next) => {
  if(!isValidArtist(req.body.artist)) {
    return res.status(400).send('Wrong params');
  } else {
    let newArtist = req.body.artist;
    db.run("UPDATE Artist set name = $name , date_of_birth = $dateOfBirth, biography =$biography, is_currently_employed = $isCurrentlyEmployed WHERE id = $id;",
    {
      $id:req.artistId,
      $name : newArtist.name,
      $dateOfBirth: newArtist.dateOfBirth,
      $biography: newArtist.biography,
      $isCurrentlyEmployed: newArtist.isCurrentlyEmployed

    }, function (err) {
        if(err) console.log(err);
        else {
          db.get("SELECT * FROM Artist where id = $id",{$id:req.artistId}, (err, row) => {
            if(err) next(err);
            else if(row) {
              res.status(200).json({artist:row});
            } else return res.status(404).send('Artist not found');
          })
        }
      }
    )}

});

artistRouter.delete('/:artistId', (req, res, next) => {
    db.run("UPDATE Artist set is_currently_employed = 0 WHERE id = $id;",
    {$id:req.artistId}, function (err) {
        if(err) console.log(err);
        else {
          db.get("SELECT * FROM Artist where id = $id",{$id:req.artistId}, (err, row) => {
            if(err) next(err);
            else if(row) {
              res.status(200).json({artist:row});
            } else return res.status(404).send('Artist not found');
          })
        }
      });
  });


const isValidArtist = (newArtist, req) => {
  if(newArtist.name === undefined) return false;
  if(newArtist.dateOfBirth === undefined) return false;
  if(newArtist.biography === undefined) return false;
  return true;
}




module.exports = artistRouter;

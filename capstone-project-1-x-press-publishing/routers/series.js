const express = require('express');
const sqlite3 = require('sqlite3');

const seriesRouter = express.Router({mergeParams:true});
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


const {getQueryAllFromTable, getQueryItemFromTable} = require('./../sql');

const tableName = 'Series';
const DEBUG = true;;

const getAllFromDatabase = (req,res,next)=> {
  db.all(getQueryAllFromTable(tableName), function (err, rows) {
        if(err) {
          next(err);
        } else {
          res.status(200).json({series:rows});
          next();
        }
      }
    )
  }


seriesRouter.param('seriesId' , function (req, res, next, id) {
  let query = getQueryItemFromTable(tableName, id);

  db.get(query, (err, row) => {
    if(err) {
          next(err);
      } else {
      req.series = row;
      req.seriesId = id;
      next();
    }
  })


})


seriesRouter.get('/', (req, res, next) => {
  getAllFromDatabase(req, res, next);
})
// Insert
seriesRouter.post('/', (req, res, next) => {
  console.log(req.body);
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
          newItem = row;
        })
      }
    }
  );

  res.status(200).send({series:newItem});
})


seriesRouter.get('/:seriesId', (req, res, next) => {
  res.status(200).send({series:req.series});
})



const isValidItem = (newItem) => {
  if(newItem.name === 'undefined') return false;
  if(newItem.description === 'undefined') return false;
  return true;
}





module.exports = seriesRouter;

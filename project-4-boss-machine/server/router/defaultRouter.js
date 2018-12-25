// Work workRouter
const express = require('express');
const workRouter = express.Router({mergeParams:true});
const db = require('../db.js');

const DEBUG  =false;

workRouter.param('workId', (req, res, next, id) => {
  if(DEBUG) console.log('-->Param:workID');

  if(isNaN(id)) {
    return res.status(404).send('Work not found!')
  };

  let work = db.getFromDatabaseById('work', id);
  if(DEBUG) console.log('\tWork:'+work);

  if(work === undefined || work === -1) {
    res.status(404).send('Work not found!');
  } else {
    req.work = work;
    next();
  }
  if(DEBUG) console.log('<--Param:workID');
})


workRouter.get('/', (req, res, next) => {
  if(DEBUG) console.log('-->get Work');

  res.send(db.getAllFromDatabase('work'));
})

workRouter.post('/', (req, res, next) => {
  if(DEBUG) console.log('-->Insert Work');
  if(DEBUG) console.log(req.body);
  let work = db.addToDatabase('work', req.body);

  res.send(work);
})

workRouter.put('/:workId', (req, res, next) => {
  if(DEBUG) console.log('-->Update Work');
  if(DEBUG) console.log(req.body);
  let updatedWork = {}
  if(req.work != undefined){
    updatedWork= db.updateInstanceInDatabase('work', req.body);
   }
  if(DEBUG) console.log('<--Update Work');
  res.send(updatedWork);
})

workRouter.get('/:workId', (req, res, next) => {
  res.send(req.work);
})


workRouter.delete('/:workId', (req, res, next) => {
  if(req.work != undefined && db.deleteFromDatabasebyId('work', req.work.id)) {
    res.status(204).send()
  } else {
    res.status(500).send();
  }
})


module.exports = workRouter;

// Minion minionRouter
const express = require('express');
const minionRouter = express.Router();
const workRouter = require('./work');


const db = require('../db.js');

const DEBUG  =false;

minionRouter.use('/:minionId/work/', workRouter);


minionRouter.param('minionId', (req, res, next, id) => {
  if(DEBUG) console.log('-->Param:minionID');

  if(isNaN(id)) {
    return res.status(404).send('Minion not found!')
  };

  let minion = db.getFromDatabaseById('minions', id);
  if(DEBUG) console.log('\tMinion:'+minion);

  if(minion === undefined || minion === -1) {
    res.status(404).send('Minion not found!');
  } else {
    req.minion = minion;
    next();
  }
  if(DEBUG) console.log('<--Param:minionID');
})


minionRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
})

minionRouter.post('/', (req, res, next) => {
  if(DEBUG) console.log('-->Insert Minion');
  if(DEBUG) console.log(req.body);

    let minion = db.addToDatabase('minions', req.body);
    minion.salary = Number(minion.salary);
    res.send(minion);
})

minionRouter.put('/:minionId', (req, res, next) => {
  if(DEBUG) console.log('-->Update Minion');
  if(DEBUG) console.log(req.body);
  let updatedMinion = {};
  if(req.minion != undefined){
     updatedMinion = db.updateInstanceInDatabase('minions', req.body);
   }
  if(DEBUG) console.log('<--Update Minion');
  res.send(updatedMinion);
})

minionRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
})


minionRouter.delete('/:minionId', (req, res, next) => {
  if(req.minion != undefined && db.deleteFromDatabasebyId('minions', req.minion.id)) {
    res.status(204).send()
  } else {
    res.status(500).send();
  }
})


module.exports = minionRouter;

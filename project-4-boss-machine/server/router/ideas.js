// Idea ideasRouter
const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const db = require('../db.js');

const DEBUG  =false;

ideasRouter.param('ideaId', (req, res, next, id) => {
  if(DEBUG) console.log('-->Param:ideaID');

  if(isNaN(id)) {
    return res.status(404).send('Idea not found!')
  };

  let idea = db.getFromDatabaseById('ideas', id);
  if(DEBUG) console.log('\tIdea:'+idea);

  if(idea === undefined || idea === -1) {
    res.status(404).send('Idea not found!');
  } else {
    req.idea = idea;
    next();
  }
  if(DEBUG) console.log('<--Param:ideaID');
})


ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  if(DEBUG) console.log('-->Insert Idea');
  if(DEBUG) console.log(req.body);
  let idea = db.addToDatabase('ideas', req.body);

  res.send(idea);
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  if(DEBUG) console.log('-->Update Idea');
  if(DEBUG) console.log(req.body);
  let updatedIdea = {};
  if(req.idea != undefined){
     updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
   }
  if(DEBUG) console.log('<--Update Idea');
  res.send(updatedIdea);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
})


ideasRouter.delete('/:ideaId', (req, res, next) => {
  if(req.idea != undefined && db.deleteFromDatabasebyId('ideas', req.idea.id)) {
    res.status(204).send()
  } else {
    res.status(500).send();
  }
})


module.exports = ideasRouter;

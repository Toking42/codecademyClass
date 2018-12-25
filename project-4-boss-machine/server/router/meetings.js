// Meeting meetingRouter
const express = require('express');
const meetingRouter = express.Router({mergeParams:true});


const db = require('../db.js');

const DEBUG  =false;



meetingRouter.param('meetingId', (req, res, next, id) => {
  if(DEBUG) console.log('-->Param:meetingID');

  // Edge-Case DELETE
  if(req.method === 'DELETE') return next();

  if(isNaN(id)) {
    return res.status(404).send('Meeting not found!')
  };

  let meeting = db.getFromDatabaseById('meetings', id);
  if(DEBUG) console.log('\tMeeting:'+meeting);

  if(meeting === undefined || meeting === -1) {
    res.status(404).send('Meeting not found!');
  } else {
    req.meeting = meeting;
    next();
  }
  if(DEBUG) console.log('<--Param:meetingID');
})


meetingRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('meetings'));
})

meetingRouter.post('/', (req, res, next) => {
  if(DEBUG) console.log('-->Insert Meeting');
  if(DEBUG) console.log(req.body);
  let meeting = db.addToDatabase('meetings', db.createMeeting());

  res.send(meeting);
})

meetingRouter.put('/:meetingId', (req, res, next) => {
  if(DEBUG) console.log('-->Update Meeting');
  if(DEBUG) console.log(req.body);
  let updatedMeeting = {};
  if(req.meeting != undefined){
     updatedMeeting = db.updateInstanceInDatabase('meetings', req.body);
   }
  if(DEBUG) console.log('<--Update Meeting');
  res.send(updatedMeeting);
})

meetingRouter.get('/:meetingId', (req, res, next) => {
  res.send(req.meeting);
})


meetingRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send()
})


module.exports = meetingRouter;

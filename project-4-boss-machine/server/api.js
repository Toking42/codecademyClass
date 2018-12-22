const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./router/minions');
const ideaRouter = require('./router/ideas');
const meetingRouter = require('./router/meetings');

const db = require('./db.js');

const DEBUG  =false;
// Test if Element exists
apiRouter.use('/minions/', minionRouter);
apiRouter.use('/ideas/', ideaRouter);
apiRouter.use('/meetings/', meetingRouter);
//
module.exports = apiRouter;

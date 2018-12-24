const express = require('express');
const apiRouter = express.Router();
const artistRouter = require('./artists');
const seriesRouter = require('./series');

apiRouter.use('/series/', (req, res, next) => {
  console.log("API->series");
  next();
}, seriesRouter);


apiRouter.use('/artists/',(req, res, next) => {
  console.log("API->artists");
  next();
}, artistRouter);


module.exports = apiRouter;

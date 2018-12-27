const express = require('express');
const apiRouter = express.Router();
const artistRouter = require('./artists');
const seriesRouter = require('./series');

apiRouter.use('/series/', seriesRouter);
apiRouter.use('/artists/', artistRouter);


module.exports = apiRouter;

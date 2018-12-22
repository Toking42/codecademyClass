const checkMillionDollarIdea = (req, res, next) => {
  if(req.body.numWeeks === undefined ||
    req.body.weeklyRevenue ===undefined ||
    isNaN(req.body.numWeeks) ||
    isNaN(req.body.weeklyRevenue) ||
    ((Number(req.body.numWeeks) * Number(req.body.weeklyRevenue)) < 1000000)) {
    return res.status(400).send('Idea inimportant');
  } else {
    next();
  }

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

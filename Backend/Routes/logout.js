const express = require('express');
const logoutRouter = express.Router();

logoutRouter.post('/', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  module.exports = logoutRouter;
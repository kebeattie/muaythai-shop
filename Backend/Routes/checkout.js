const express = require('express');
const checkoutRouter = express.Router();
const db = require('../DB/dbFunctions');

checkoutRouter.get('/', db.getUsers);

module.exports =  checkoutRouter;
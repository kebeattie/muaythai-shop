const express = require('express');
const ordersRouter = express.Router();
const db = require('../DB/dbFunctions');

ordersRouter.get('/', db.getOrders);
ordersRouter.get('/order', db.getOrderById);
ordersRouter.get('/orderItems', db.getOrderItems);

module.exports =  ordersRouter;
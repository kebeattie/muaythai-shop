const express = require('express');
const cartRouter = express.Router();
const db = require('../DB/dbFunctions');

cartRouter.get('/', db.getCart);

cartRouter.post('/addToCart/:id', async (req, res, next) => {
    const {id} = req.params;
    const {quantity, email} = req.body;
    try {
        await db.addToCart(id, quantity, email);
        console.log(`Item of id ${id} added to cart`);
        res.send('item added');
        
    } catch(err) {
        res.send('Product not found or it is already in your cart')

    }
});

cartRouter.post('/deleteFromCart/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await db.deleteFromCart(id);
        res.send('Item deleted')
    } catch(err) {
        res.send('Error');
    }
})

cartRouter.post('/checkout', async(req, res, next) => {
    const { email } = req.body;
    try {
        db.checkout(email);
        res.send('Order confirmed');
    } catch(error){
        res.send(error);
    }
})

module.exports =  cartRouter;
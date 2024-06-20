const express = require('express');
const productsRouter = express.Router();
const db = require('../DB/dbFunctions');

productsRouter.get('/', db.getProducts);

productsRouter.get('/:category', async (req, res)=> {
    try {
        const { category } = req.params;
        results = await db.getProductsByCategory(category);

        if(!results) { throw new Error('No items for this category found') };
        res.status(200).send(results);

    } catch(err) {
        res.redirect('/');
    }
})

module.exports =  productsRouter;
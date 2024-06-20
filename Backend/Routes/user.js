const express = require('express');
const userRouter = express.Router();
const db = require('../DB/dbFunctions');

userRouter.get('/', db.getUsers);


//Find user by associated email
userRouter.get('/:email', async (req, res, next) => {

    try {
        const { email } = req.params;
        const user = await db.findByEmail(email);

        if(!user) {throw new Error ('User not found')};
        //Return user's name if found
        res.status(200).send(`{"name" : "${user.firstname} ${user.lastname}"}`)

    } catch(err) {
        //Redirect to home page if not found
        res.redirect('/');
    }
    
});


//Allow a user to change their password
userRouter.post('/changepassword', async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const changedPassword = await db.changePassword(email, password);
        console.log('success');
        res.status(200).send(changedPassword);
    } catch(err) {
        console.log('fail');
        res.redirect('/');
    }
});





module.exports =  userRouter ;
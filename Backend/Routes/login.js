const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
const localStrategy = require('../local-strategy');


loginRouter.post('/', passport.authenticate('local'), (req, res) => {
    res.status(200).send(req.session);
})

// loginRouter.get('/', (req, res) => {
//     res.status(200).send(req.session);
// })


module.exports =  loginRouter;
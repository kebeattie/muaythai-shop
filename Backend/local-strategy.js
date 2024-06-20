const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./DB/dbFunctions');
const bCrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    try {
        const findUser = db.findByEmail(email);
        if (!findUser) throw new Error ('User not found');
        done(null, findUser);
    } catch(error) {
        done(error, null);
    }
})



passport.use(
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const findUser = await db.findByEmail(username);
            const matchedPassword = await bCrypt.compare(password, findUser.password); 
            if (!findUser) throw new Error('User not found');
            if (matchedPassword === false) throw new Error('Invalid credentials');
            done(null, findUser);
    
        } catch(err) {
            done(err, null);
    }
        
    })
);
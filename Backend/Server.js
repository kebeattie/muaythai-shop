const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const userRouter = require('./Routes/user');
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');
const checkoutRouter = require('./Routes/checkout');
const cartRouter = require('./Routes/cart');
const loginRouter = require('./Routes/login');
const registrationRouter = require('./Routes/registration');
const logoutRouter = require('./Routes/logout');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use (
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());

//Initialize session
app.use(
    session({
        secret: 'placeholder',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 600000 * 60
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

//Configure Router
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/logout', logoutRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});




app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

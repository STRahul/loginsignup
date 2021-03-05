const express = require('express');
const app = express();
const router = express.Router();

const control = require('../controller/controller.js');
const {checkToken} = require('../authontication/tokenvalidation')


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup',checkToken, control.signup);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', control.login);


router.get('/forgot-password', control.getForgotPassword);
router.post('/forgot', control.forgot);

router.get('/resetpassword/:resetLink', control.getResetPassword);
router.post('/reset', control.reset);



module.exports = router;
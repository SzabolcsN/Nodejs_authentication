const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registrationValidation, loginValidation} = require('../validation/validation')
const {logger} = require('../logs-winston/login_logs')

router.post('/register', async (req, res) => {
    //Validate data
    const {error} = registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Email check in DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist!');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        //Log the registration
        logger.log('info', `Registered ${user.email}`,);
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    //Validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Email check in DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong!');
    
    //Password is correct
    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email or password is wrong!');

    //Log the login
    logger.log('info', `Logged in ${user.email}`,);

    //Create adn assing a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;
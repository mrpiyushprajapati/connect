const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersConroller=require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersConroller.profile);
router.post('/update/:id', passport.checkAuthentication, usersConroller.update);
router.get('/sign-in', usersConroller.signIn);
router.get('/sign-up', usersConroller.signUp);

router.post('/create', usersConroller.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersConroller.createSession);

router.get('/sign-out', usersConroller.destroySession);

module.exports = router;    
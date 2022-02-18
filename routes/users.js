const express = require('express');

const router = express.Router();
const usersConroller=require('../controllers/users_controller');

router.get('/profile', usersConroller.profile);
router.get('/sign-in', usersConroller.signIn);
router.get('/sign-up', usersConroller.signUp);

router.post('/create', usersConroller.create);

module.exports = router;    
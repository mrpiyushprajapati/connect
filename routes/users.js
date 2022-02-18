const express = require('express');

const router = express.Router();
const usersConroller=require('../controllers/users_controller');

router.get('/profile', usersConroller.profile)

module.exports = router;    
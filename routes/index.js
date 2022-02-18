const express = require('express');

const router = express.Router();
const homeController=require('../controllers/home_controller');

console.log('roter loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for adding more routes access from here
//router.use('/routerName', require('./routerFile'));

module.exports=router;
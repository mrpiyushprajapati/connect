const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendshipController = require('../controllers/friendship_controller');

router.post('/newreq/:id', friendshipController.newrequest);
router.post('/delreq/:id', friendshipController.delfriend);


module.exports = router;
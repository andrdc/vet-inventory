const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var leashController = require(path.join(__dirname, '../controllers/leash'));

/* Leash Routes */
router.get('/', leashController.leashes);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var foodController = require(path.join(__dirname, '../controllers/food'));

/* Food Routes */
router.get('/', foodController.foods);

module.exports = router;

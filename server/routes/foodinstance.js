const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var foodinstanceController = require(path.join(__dirname, '../controllers/foodinstance'));

/* FoodInstance Routes */
router.get('/', foodinstanceController.foodinstances);

module.exports = router;

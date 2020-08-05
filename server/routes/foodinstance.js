const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var foodinstanceController = require(path.join(__dirname, '../controllers/foodinstance'));

/* FoodInstance Routes */
router.get('/', foodinstanceController.foodinstances);
router.post('/', foodinstanceController.create_foodinstance);
router.get('/find/:id', foodinstanceController.find_foodinstance);

module.exports = router;

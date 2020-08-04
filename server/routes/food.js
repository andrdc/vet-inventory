const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var foodController = require(path.join(__dirname, '../controllers/food'));

/* Food Routes */
router.get('/', foodController.foods);
router.post('/', foodController.create_food);
router.get('/find/:id', foodController.find_food);
router.post('/update/:id', foodController.update_food);

module.exports = router;

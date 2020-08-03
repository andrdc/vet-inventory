const express = require('express');
const router = express.Router();
const path = require('path');

/* Require Controller Modules */
var leashinstanceController = require(path.join(__dirname, '../controllers/leashinstance'));

/* FoodInstance Routes */
router.get('/', leashinstanceController.leashinstances);
router.post('/', leashinstanceController.create_leash_instance);

module.exports = router;

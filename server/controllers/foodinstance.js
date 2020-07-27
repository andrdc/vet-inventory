var FoodInstance = require('../models/foodinstance');

/* Display list of Food Instances */
exports.foodinstances = (req, res, next) => {
	FoodInstance.find()
				.populate('foodinstance')
				.sort([['receive_date', 'ascending']])
				.exec((err, foodinstances) => {
					if(err)
						return next(err);

					/* Success */
					res.json(foodinstances);
				});
};

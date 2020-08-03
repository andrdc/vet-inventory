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

/* Create new Food Instance */
exports.create_foodinstance = (req, res, next) => {
	let foodinstance = new FoodInstance({
		food: req.body.food,
		receive_date: req.body.receive_date,
		expiration_date: req.body.expiration_date
	});

	foodinstance.save((err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(foodinstance);
	})
}

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
};

/* Find Food Instance by Id */
exports.find_foodinstance = (req, res, next) => {
	FoodInstance.findById(req.params.id).exec((err, foodinstance) => {
		if(err)
			return next(err);

		if(foodinstance === null){
			let err = new Error('Food Instance not found');
			err.status = 404;
			return next(err);
		}

		/* Success */
		res.json(foodinstance);
	});
};

/* Update FoodInstance */
exports.update_foodinstance = (req, res, next) => {
	let foodinstance = new FoodInstance({
		food: req.body.food,
		receive_date: req.body.receive_date,
		expiration_date: req.body.expiration_date,
		_id: req.params.id
	});

	FoodInstance.findByIdAndUpdate(req.params.id, foodinstance, {}, (err, theFoodInstance) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(theFoodInstance);
	});
};

/* Delete FoodInstance */
exports.delete_foodinstance = (req, res, next) => {
	FoodInstance.findByIdAndRemove(req.params.id, (err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(200).end();
	});
};

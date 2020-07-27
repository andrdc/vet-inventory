var Food = require('../models/food');

/* Display list of Food */
exports.foods = (req, res, next) => {
	Food.find()
		.populate('food')
		.sort([['brand', 'ascending']])
		.exec((err, foods) => {
			if(err)
				return next(err);

			/* Success */
			res.json(foods);
		});
};

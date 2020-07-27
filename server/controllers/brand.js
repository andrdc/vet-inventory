var Brand = require('../models/brand');

/* Display list of Brands */
exports.brands = (req, res, next) => {
	Brand.find()
		  .populate('brand')
		  .sort([['name', 'ascending']])
		  .exec((err, brands) => {
		if(err)
			return next(err);
		/* Success */
		res.json(brands);
	});
};

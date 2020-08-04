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

/* Create new Brand */
exports.create_brand = (req, res, next) => {
	let brand = new Brand({
		name: req.body.name,
	});

	brand.save((err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(brand);
	});
};

/* Edit Brand */
exports.edit_brand = (req, res, next) => {
	let brand = new Brand({
		name: req.body.name,
		_id: req.params.id
	});

	Brand.findByIdAndUpdate(req.params.id, brand, {}, (err, theBrand) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(theBrand);
	});
}

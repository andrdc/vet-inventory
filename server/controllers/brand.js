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

/* Find a Brand by ID */
exports.find_brand = (req, res, next) => {
	Brand.findById(req.params.id).exec((err, brand) => {
		if(err)
			return next(err);

		if(brand == null){
			let err = new Error('Brand not found');
			err.status = 404;
			return next(err);
		}

		/* Success */
		res.json(brand);
	});
};

/* Edit Brand */
exports.update_brand = (req, res, next) => {
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
};

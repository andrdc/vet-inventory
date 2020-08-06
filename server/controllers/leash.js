var Leash = require('../models/leash');

/* Display list of Leashes */
exports.leashes = (req, res, next) => {
	Leash.find()
		 .populate('leash')
		 .sort([['name', 'ascending']])
		 .exec((err, leashes) => {
			if(err)
				return next(err);

			/* Success */
			 res.json(leashes);
		});
};

/* Create new Leash */
exports.create_leash = (req, res, next) => {
	let leash = new Leash({
		material: req.body.material,
		price_vet: req.body.price_vet,
		price_public: req.body.price_public,
		brand: req.body.brand,
		name: req.body.name
	});

	leash.save((err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(leash);
	})
};

/* Find a Leash by ID */
exports.find_leash = (req, res, next) => {
	Leash.findById(req.params.id).exec((err, leash) => {
		if(err)
			return next(err);

		if(leash === null){
			let err = new Error('Leash not found');
			err.status = 404;
			return next(err);
		}

		/* Success */
		res.json(leash);
	});
};

/* Update Leash */
exports.update_leash = (req, res, next) => {
	let leash = new Leash({
		material: req.body.material,
		price_vet: req.body.price_vet,
		price_public: req.body.price_public,
		brand: req.body.brand,
		name: req.body.name,
		_id: req.params.id
	});

	Leash.findByIdAndUpdate(req.params.id, leash, {}, (err, theLeash) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(theLeash);
	});
};

/* Delete Leash by ID */
exports.delete_leash = (req, res, next) => {
	Leash.findByIdAndRemove(req.params.id, (err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(200).end();
	});
};

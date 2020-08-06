var LeashInstance = require('../models/leashinstance');

/* Display list of Leash Instances */
exports.leashinstances = (req, res, next) => {
	LeashInstance.find()
				.populate('leashinstance')
				.sort([['receive_date', 'ascending']])
				.exec((err, leashinstances) => {
					if(err)
						return next(err);

					/* Success */
					res.json(leashinstances);
				});
};

/* Create Leash Instance */
exports.create_leash_instance = (req, res, next) => {
	let leashinstance = new LeashInstance({
		leash: req.body.leash,
		receive_date: req.body.receive_date
	});

	leashinstance.save((err) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(leashinstance);
	});
};

/* Find Leash Instance by Id */
exports.find_leash_instance = (req, res, next) => {
	LeashInstance.findById(req.params.id).exec((err, leashinstance) => {
		if(err)
			return next(err);

		if(leashinstance === null){
			let err = new Error('LeashInstance not found');
			err.status = 404;
			return next(err);
		}

		/* Success */
		res.json(leashinstance);
	});
};

/* Update Leash Instance */
exports.update_leash_instance = (req, res, next) => {
	let leashinstance = new LeashInstance({
		leash: req.body.leash,
		receive_date: req.body.receive_date,
		_id: req.params.id
	});

	LeashInstance.findByIdAndUpdate(req.params.id,
									leashinstance,
									{},
									(err, theLeashInstance) => {
		if(err)
			return next(err);

		/* Success */
		res.status(201).json(theLeashInstance);
	});
};

/* Delete LeashInstance by ID */
exports.delete_leash_instance = (req, res, next) => {
	LeashInstance.findByIdAndRemove(req.params.id, (err) => {
		if(err)
			return next(err);

		/* Succes */
		res.status(200).end();
	});
};

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

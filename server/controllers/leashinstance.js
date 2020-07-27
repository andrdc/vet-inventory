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

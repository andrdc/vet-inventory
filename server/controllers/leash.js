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

const { model, Schema } = require('mongoose');

const Movie = model('Movie', new Schema({
	_id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	releaseYear: {
		type: String,
		required: true,
		trim: true,
	},
	format: {
		type: String,
		required: true,
		trim: true,
		validate: (value) => {
			const formats = ['vhs', 'dvd', 'blu-ray'];

			if (!formats.includes(value.toLowerCase())) {
				throw new Error('Is not valid format');
			}
		}
	},
	stars: {
		type: String,
		required: true,
		trim: true,
	},
}, { _id: false }));

module.exports = Movie;
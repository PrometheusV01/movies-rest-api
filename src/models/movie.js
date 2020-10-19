const { model } = require('mongoose');

const Movie = model('Movie', {
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

			if (formats.includes(value.toLowerCase())) {
				throw new Error('Is not valid format');
			}
		}
	},
	starts: {
		type: String,
		required: true,
		trim: true,
	},
});

module.exports = Movie;
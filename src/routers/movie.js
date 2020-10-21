const express = require('express');
const Movie = require('../models/movie');

//set up router
const router = express.Router();

router.post('/api/movies', async (req, res) => {
	const lastDoc = await Movie.findOne({}).sort({ _id: -1 });

	const _id = lastDoc ? Number(lastDoc._id) + 1 : 1;

	Movie.create({ ...req.body, _id })
		.then((movie) => res.send(movie))
		.catch((error) => res.status(400).send(error));
});

router.post('/api/movies/search', async (req, res) => {
	const { filters, page, order = 'asc', } = req.body;
	const { title = '', stars = '' } = filters;
	const limit = 5;

	try {
		const movies = await Movie.find({ title: new RegExp(title, 'i'), stars: new RegExp(stars, 'i') })
			.sort({ title: order })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		const count = await Movie.countDocuments();

		res.json({
			movies,
			count,
			limit
		});
	} catch {
		res.status(500).send();
	}
});

router.get('/api/movies/:id', (req, res) => {
	const _id = req.params.id;

	Movie.findById(_id)
		.then((movie) => {
			if (!movie) {
				return res.status(404).send();
			}

			res.send(movie);
		})
		.catch((e) => res.status(500).send(e));
});

router.delete('/api/movies/:id', async ({ params }, res) => {
	const { id } = params;

	try {
		const movie = await Movie.findByIdAndDelete(id);

		if (!movie) {
			return res.status(404).send('Movie not found');
		} 

		res.send(movie);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
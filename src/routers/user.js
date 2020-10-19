const express = require('express');
const Movie = require('../models/movie');

//set up router
const router = express.Router();

router.post('/movies', (req, res) => {
	Movie.create(req.body)
		.then((user) => res.send(user))
		.catch((error) => res.status(400).send(error));
});

router.get('/movies', (req, res) => {
	Movie.find({})
		.then((users) => res.send(users))
		.catch(() => res.status(500).send());
});

router.get('/movies/:id', (req, res) => {
	const _id = req.params.id;

	Movie.findById(_id)
		.then((user) => {
			if (!user) {
				return res.status(404).send();
			}

			res.send(user);
		})
		.catch((e) => res.status(500).send(e));
});

router.put('/movies/:id', async (req, res) => {
	const id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password'];

	const isAllowed = updates.every((item) => allowedUpdates.includes(item));

	if (!isAllowed) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const user =  await Movie.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

		if (!user) {
			return res.status(404).send('User not found');
		}

		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/movies/:id', async ({ params }, res) => {
	const { id } = params;

	try {
		const user = await Movie.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).send('User not found');
		} 

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
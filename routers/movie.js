var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {


    getAll: function (req, res) {


        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(movies);
            }
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;

        try{

        if (JSON.stringify(movieTitleString) === "Xam");{
            console.log('enters');

        }
    
    }
        catch{
            console.log("error")

        }
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
		Movie.findOneAndRemove({ title: req.params.title }, function (err) {
			if (err) return res.status(400).json(err);

			res.json();
		});
	},

	deleteOneByTitle: function (req, res) {
		Movie.findOneAndRemove({ title: req.params.title }, function (err) {
			if (err) return res.status(400).json(err);

			res.json();
		});
	},
    deleteYear: function (req, res) {
		let year1 = req.params.year1;
		let year2 = req.params.year2;

		Movie.deleteMany({year : {$gte: year1}, year : {$lte: year2} })
			.exec(function (err, docs) {
				res.json(docs);
			});
	},

	delete: function (req, res) {
		let year1 = req.body.year1;
		let year2 = req.body.year2;
		Movie.deleteMany(
			{year: { $gt: year2, $lt: year1 } },
			function (err, obj) {
				res.json(obj.result);
			}
		);
	},



	addActor: function (req, res) {

		Movie.findOne({ _id: req.params.mid }, function (err, movie) {
			if (err) return res.status(400).json(err);
			if (!movie) return res.status(404).json();

			Actor.findOne({ _id: req.params.aid}, function (err, actor) {
				if (err) return res.status(400).json(err);
				if (!actor) return res.status(404).json();

				// actor.movies.push(movie._id);
				movie.actors = [...movie.actors, actor._id];
				movie.save(function (err) {
					if (err) return res.status(500).json(err);

					res.json(movie);
				});
			});
		});
	},

	deleteActorById: function (req, res) {
		Movie.findOne({ _id: req.params.mid }, function (err, movie) {
			if (err) return res.status(400).json(err);
			if (!movie) return res.status(404).json();

			Actor.findOne({ _id: req.params.aid }, function (err, actor) {
				if (err) return res.status(400).json(err);
				if (!actor) return res.status(404).json();
				const index = movie.actors.indexOf(actor._id);
				movie.actors.splice(index, 1);
				movie.save(function (err) {
					if (err) return res.status(500).json(err);

					res.json(movie);
				});
			});
		});
	},

    findallX:  function (req, res) {       
    
		Movie.updateMany({"name": "/X/"}, {$inc: {year:1}}, function (err, data) {
			res.json("X names incremented by one");
	
		})
		},
};
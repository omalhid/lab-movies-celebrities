// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

//GET route to display the form for adding a new movie
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", { celebritiesFromDB });
    })
    .catch((err) => next(err));
});
//POST route to submit the created Movie
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findOne({ title })
    .then((movieFromDB) => {
      if (!movieFromDB) {
        Movie.create(req.body).then(() => res.redirect("/movies"));
      } else {
        res.render("celebrities/new-movie", {
          message: "Movie already registered in the database",
        });
        return;
      }
    })
    .catch((err) => next(err));
});

//GET route to display the list of movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((listOfMovies) => {
      console.log("list of movies");
      res.render("movies/movies", { listOfMovies });
    })
    .catch((err) => next(err));
});

//GET route for movie details
router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
});

//POST route for deleting movie
router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

//GET route for editing movies
router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      Celebrity.find().then((celebrities) => {
        res.render("movies/edit-movie", { movie, celebrities });
      });
    })
    .catch((err) => next(err));
});

//POST route for editing movies
router.post("/movies/:id/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;

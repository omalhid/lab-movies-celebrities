// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')

// all your routes here
//GET route to display the form for adding a new movie

router.get('/movies/create', (req,res,next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        res.render('movies/new-movie', {celebrities: celebritiesFromDB})
    })
    .catch((err) => console.log(err))
})
//POST route to submit the created Movie
router.post('/movies/create', (req,res,next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.findOne({title})
    .then((movieFromDB) => {
        if(!movieFromDB){
            Movie.create(req.body)
            .then(()=>res.redirect('/movies/movies'));
        }else{
            res.render('celebrities/new-movie', {
                message: 'Movie already registered in the database'
            });
            return;
        }
    })
    .catch((err) => {
        console.log('error occurred while adding your movie', err);
    })
})

//GET route to display the list of movies
router.get('/movies/movies', (req, res, next) => {
    Movie.find()
    .then((listOfMovies)=>{
        console.log('list of movies');
        res.render('movies/movies', {listOfMovies})
    })
    .catch((err)=> console.log('error occurred while listing the movies ', err))
})

//GET route for movie details
router.get('/movies/:id', (req,res,next) => {

    Movie.findById(req.params.id)
    .populate('cast')
    .then((movie)=>{
        res.render('movies/movie-details', { movie })
    })
    .catch((err)=> console.log(err))
})

//POST route for deleting movie
router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(()=>res.redirect('/movies/movies'))
})


module.exports = router;
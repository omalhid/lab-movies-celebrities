// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here
//GET route for displaying the form to create a celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

//POST route to submit the created Celebrity
router.post('/celebrities/create', (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findOne({name})
    .then((celebrityFromDB) => {
        if(!celebrityFromDB){
            Celebrity.create(req.body)
            .then(()=>res.redirect('/celebrities/celebrities'));
        }else{
            res.render('celebrities/new-celebrity', {
                message: 'Celebrity already registered in the database'
            });
            return;
        }
    })
    .catch((err) => {
        console.log('error occurred while adding your celebrity', err);
    })
})

//GET route to display the loist of celebrities
router.get('/celebrities/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((listOfCelebrities)=>{
        console.log('list of celebrities');
        res.render('celebrities/celebrities', {listOfCelebrities})
    })
    .catch((err)=> console.log('error occurred while listing the celebrities ', err))
})

module.exports = router;
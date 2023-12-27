const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Celebrity = require('../models/Celebrity.model')

const movieSchema = new Schema({
    title: {
        type:String,
        unique:true },
    genre: String,
    plot: String,
    cast:{
        type: ObjectId,
        ref:'Celebrity'
    }
})

const Movie = mongoose.model ("Movie", movieSchema);
module.exports = Movie;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    publishYear:{
        type: String,
        required: true
    },
    coverId:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book',BookSchema)

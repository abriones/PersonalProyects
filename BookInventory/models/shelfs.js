const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShelfSchema = new Schema({
    shelftName:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
})

module.exports = mongoose.model('Shelf',ShelfSchema)

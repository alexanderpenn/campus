const Mongoose = require('mongoose')

const questionSchema = new Mongoose.Schema({
    questionText: { type: String, required: true },
    answer: { type: String, required: true },
    author: { type: String, required: true },
})


module.exports =  Mongoose.model('Question', questionSchema)

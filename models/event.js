const mongoose = require('mongoose')
const {Schema} = mongoose;
const eventsSchema = new Schema({
    content: String,
    image: String,
    location: String,
    title: String,
    time: Date
})

const events = mongoose.model('events', eventsSchema)
module.exports = events
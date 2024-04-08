const mongoose = require('mongoose')
const {Schema} = mongoose;
const EventsSchema = new Schema({
    content: String,
    image: String,
    location: String,
    title: String,
    time: Date
})

const Events = mongoose.model('events', EventsSchema)
module.exports = Events
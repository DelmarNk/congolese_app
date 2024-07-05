const mongoose = require('mongoose')
const {Schema} = mongoose;
const EventsSchema = new Schema({
    content: String,
    image: String,
    location: String,
    title: String,
    time: Date,
    attendees: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Events = mongoose.model('events', EventsSchema)
module.exports = Events
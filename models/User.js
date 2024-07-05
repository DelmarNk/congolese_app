const mongoose = require('mongoose')
const {Schema} = mongoose;
const UserSchema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    phoneNumber: Number,
    password: String
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret)=>{
            delete ret.password
            return ret
        }
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
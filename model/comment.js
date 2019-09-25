const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 1000,
        min: 3
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    post: {
        type: mongoose.Schema.ObjectId, ref:'Post'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);

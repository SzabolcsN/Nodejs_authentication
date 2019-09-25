const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 30,
        min: 3
    },
    description:{
        type: String,
        required: true,
        max: 5000,
        min: 10
    },
    user:{
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);

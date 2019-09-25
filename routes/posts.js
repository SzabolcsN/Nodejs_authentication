const router = require('express').Router();
const verify = require('../verify/verifyToken')
const { postsValidation, commentValidation } = require('../validation/validation');
const Post = require('../model/post');
const Comment = require('../model/comment');
const createError = require('http-errors');
const mongoose = require('mongoose');
const {logger} = require('../logs-winston/posts-logger');

//List posts
router.get('/', function (req, res, next) {
    Post.find({}, function (err, posts){
        if(err){
            return next(createError(400, error.details[0].message));
            next();
        }
        res.json(posts);
    });    
});

//Create post
router.post('/', verify, (req, res, next) => {
    //Validate data
    const {error} = postsValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    if(error){
        return next(createError(400, error.details[0].message));
        next();
    }
    
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id
    });
    try{
        const savedPost = post.save();
        logger.log('info', `New post title: ${post.title}`,);
        res.send({post: post._id});
    }catch(err){
        return next(createError(400, error.details[0].message));
        next();
    }
 });

 //Create comment
 router.post('/:id', verify, (req, res, next) => {
     //Validate data
    const {error} = commentValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    if(error){
        return next(createError(400, error.details[0].message));
        next();
    }
    
    Post.findById(req.params.id)
    .then(doc => {
        const comment = new Comment({
            description: req.body.description,
            user: req.user._id,
            post: req.params.id
        });
        try{        
            const savedComment = comment.save();
            logger.log('info', `Commented ${req.user._id}`,);
            res.send({comment: comment._id});
        }catch(err){
            return next(createError(400, doc));
            next();
        }
        if(!doc) {return res.status(404).end();}
        return next(createError(200, doc));
        next();
    })
    .catch(err => next(err));
 });

 //Get one post by ID
router.get('/:id', function (req, res, next) {
    Post.findById(req.params.id)
    .then(doc => {
        if(!doc) {return res.status(404).end();}
            return next(createError(200, doc));
            next();
    })
    .catch(err => next(err));
});

//Edit post title/description or both by ID
router.put('/:id', function (req, res, next){
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, post) => {
            if(err){
                return next(createError(400, err.details[0].message));
                next();
            }
        logger.log('info', `Post edited ${req.params.id}`,);
        return res.send("Post edited!");
        }
    )
});

//Delete post by ID
router.delete('/:id', function (req, res, next){
    Post.findByIdAndRemove(
        req.params.id, 
        req.body,
        (err, post) => {
            if(err){
                return next(createError(400, err.details[0].message));
                next();
            }
    });
    Comment.deleteMany({post: req.params.id}, function (err){
        if(err){
            return next(createError(400, err.details[0].message));
            next();
        }
        logger.log('info', `Post deleted ${req.params.id}`,);
        res.json("Post deleted!");
    });
});


module.exports = router;

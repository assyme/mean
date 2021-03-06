'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  _ = require('lodash');


 module.exports = function(Comments){
 	
 	return {

 		/**
		 * Find Comment by id
		 */
		comment : function(req, res, next, id) {
		  Comment.load(id, function(err, Comment) {
		    if (err) return next(err);
		    if (!Comment) return next(new Error('Failed to load Comment ' + id));
		    req.comment = Comment;
		    next();
		  });
		},

 		/**
 		 * Creates a new comment
 		 */
 		create : function(req,res){
 			
      var comment = new Comment(req.body);
      comment.user = req.user;
      comment.save(function(err){
        if (err){
          return res.status(500).json({
            error: "Could not save the comment"
          });
        }else{ // Comment saved. 
          res.json(comment);
        }
      });
 		},

    /**
     * Returns comments for an article. 
     */
    fetchByArticle: function(req,res){
      var articleId = req.body.articleId;

      Comment.find({article: articleId})
      .where({'$or':[{'isApproved':true},{'user':req.user}]})
      .populate("user","name username")
      .exec(function(err,comments){
        if (err){
          res.status(500).json({
            error: "Could not fetch comments"
          });
        }else{
          res.json(comments);
        }
      })
    },

    /**
      * List of Articles
      */
      fetchPendingComments: function(req, res) {
          Comment.find({'$or': [{'isApproved' : false},{'isApproved': {'$exists':false}}]}).sort('-created').populate('user', 'name username').exec(function(err, comments) {
              if (err) {
                  return res.status(500).json({
                      error: 'Cannot list the comments'
                  });
              }
              res.json(comments);
          });
      },

      /**
       * updates a comment
       */
      update : function(req,res){
        console.log("updating..");
        var commentId = req.body.commentId;

        Comment.findOne({ '_id': commentId }, function (err, comment){
          comment.isApproved = true;
          comment.save(function(err){
            if (err){
              return res.status(500).json({
                error: "Could not save the comment"
              });
            }else{
              res.json(comment);
            }
          });
        });
      }
 	  }
 }


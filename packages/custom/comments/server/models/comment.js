'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Array
  },
  article: {
  	type: Schema.ObjectId,
  	ref: 'Article'
  }
});

/**
 * Validations
 */
CommentSchema.path('content').validate(function(content) {
  return !!content;
}, 'comment content cannot be blank');

/**
 * Statics
 */
CommentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Comment', CommentSchema);
/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Comment = mongoose.model('Comment');

/**
 * Globals
 */
var user;
var article;
var comment;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Comment:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        article = new Article({
          title: 'Article Title',
          content: 'Article Content',
          user: user
        });
        article.save(function(){
          comment = new Comment({
            content: 'New comment',
            user: user,
            article: article
          });
          done();
        })
      });


    });
    describe('Method Save', function() {

      it('should be able to save without problems', function(done) {
        this.timeout(10000);

        return comment.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.content).to.equal('New comment');
          expect(data.user.length).to.not.equal(0);
          expect(data.article.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          expect(data.article.id).to.equal(article.id);
          done();
        });

      });

      it('should be able to show an error when try to save without content', function(done) {
        this.timeout(10000);
        comment.content = '';

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        this.timeout(10000);
        comment.user = {};

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without article', function(done) {
        this.timeout(10000);
        comment.article = {};

        return comment.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      article.remove(function() {
        user.remove(function(){
          comment.remove(done);
        });
      });
    });
  });
});

'use strict';


// Comment authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.article.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Comments, app, auth, database) {
  
  var comments = require('../controllers/comments')(Comments);
  

  app.route('/api/comments/')
    .post(auth.requiresLogin, comments.create);

    app.route('/api/comments/article/:articleId')
    .post(comments.fetchByArticle);

    app.route('/api/comments/pending/')
    .get(comments.fetchPendingComments);

  //Finish with setting up the postId param
  app.param('commentId', comments.comment);
};

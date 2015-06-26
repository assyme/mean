'use strict';

//Comments service used for articles REST endpoint
angular.module('mean.comments').factory('CommentsConnection', ['$resource','$http',function($resource,http) {	

  	var CommentsConnectionClass = function(){
    	var rootUrl = 'api/comments/';
    };

    CommentsConnectionClass.prototype.Create = (function(res){
	    return res('api/comments/:commentId',{commentId: '@_id'},{update: {method: 'PUT'}});
	})($resource);

	CommentsConnectionClass.prototype.FetchByArticle = function(article){
		return http.post('/api/comments/article/' + article._id,{articleId : article._id});
	}

	CommentsConnectionClass.prototype.PendingComments = function(){
		return http.get('/api/comments/pending/');
	}

	return new CommentsConnectionClass();
	
}]);

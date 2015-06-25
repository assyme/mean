'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'CommentsConnection',
  function($scope, Global,CommentsConnection) {
    $scope.global = Global;

    $scope.init = function(article){
    	$scope.currentArticle = article;
    	$scope.commentBody = "";
    	$scope.currentArticle.comments = [];
    	CommentsConnection.FetchByArticle(article).success(function(response){
            $scope.currentArticle.comments = response;
        });
    }

    $scope.addComment = function(isValid){
    	if (isValid){	
    		var comment = new CommentsConnection.Create({
    			content : this.commentBody,
    			article : $scope.currentArticle._id
    		});
    		comment.$save(function(response){
    			if (typeof response.error == "undefined"){
    				$scope.currentArticle.comments.push(response);
    				$scope.commentBody = "";
    			}
    		});
    	}
    	else{
    		console.log("This wont since the form is not complete");
    		$scope.submitted = true;
    	}
    }

  }
]);

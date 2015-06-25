'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'Comments',
  function($scope, Global,Comments) {
    $scope.global = Global;

    $scope.init = function(article){
    	$scope.currentArticle = article;
    	$scope.commentBody = "";
    	$scope.currentArticle.comments = [];
    }

    $scope.addComment = function(isValid){
    	if (isValid){	
    		var comment = new Comments({
    			content : this.commentBody,
    			article : $scope.currentArticle._id
    		});
    		comment.$save(function(response){
    			if (typeof response.error == "undefined"){
    				$scope.currentArticle.comments.push(response);
    				this.commentBody = "";
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

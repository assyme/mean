'use strict';

//Comments service used for articles REST endpoint
angular.module('mean.comments').factory('Comments', ['$resource',
  function($resource) {
    return $resource('api/comments/:commentId',{
    	commentId: '@_id'
    },{
    	update: {
    		method: 'PUT'
    	}
    });
  }
]);

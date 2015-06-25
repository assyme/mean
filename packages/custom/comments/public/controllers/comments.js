'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
]);

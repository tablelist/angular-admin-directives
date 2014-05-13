'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('UserListCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
  }]);


demoControllers.controller('FormBuilderCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
  }]);

demoControllers.controller('PanelBuilderCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
  }]);

demoControllers.controller('QueryBuilderCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
  }]);

demoControllers.controller('DetailsPanelCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();
  }]);

// demoControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);

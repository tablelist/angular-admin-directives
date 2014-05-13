'use strict';

/* App Module */

var demoApp = angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'demoServices'
]);

demoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'templates/user-list.html',
        controller: 'UserListCtrl'
      })
      .otherwise({
        redirectTo: '/phones'
      });
  }]);

'use strict';

/* App Module */

var app = angular.module('app', [
  'ngRoute',
  'demoServices',
  'directives.form-builder',
  'directives.panel-builder',
  'directives.query-builder',
  'directives.details-panel',
  'textAngular'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'templates/user-list.html',
      }).
      when('/form-builder', {
        templateUrl: 'templates/form-builder.html',
        controller: 'FormBuilderCtrl'
      }).
      when('/panel-builder', {
        templateUrl: 'templates/panel-builder.html',
      }).
      when('/query-builder', {
        templateUrl: 'templates/query-builder.html',
        controller: 'QueryBuilderCtrl'
      }).
      when('/details-panel', {
        templateUrl: 'templates/details-panel.html',
        controller: 'DetailsPanelCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);

app.run(['$rootScope', 'User',
  function ($rootScope, User) {

    // We'll be using our demo user list on almost
    // every page. For the sake of demo simplicity,
    // let's throw it into root scope.
    $rootScope.users = User.query();

  }])

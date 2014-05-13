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
      when('/users', {
        templateUrl: 'templates/user-list.html',
        controller: 'UserListCtrl'
      }).
      when('/form-builder', {
        templateUrl: 'templates/form-builder.html',
        controller: 'FormBuilderCtrl'
      }).
      when('/panel-builder', {
        templateUrl: 'templates/panel-builder.html',
        controller: 'PanelBuilderCtrl'
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

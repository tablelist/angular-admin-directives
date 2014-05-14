'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('HomeCtrl', ['$scope', 'User',
  function($scope, User) {
    // Initialize your data
    $scope.users = User.query();
  }]);

demoControllers.controller('FormBuilderCtrl', ['$scope', 'User',
  function($scope, User) {

    // Initialize your data
    $scope.users = User.query();

    // Setup parameters for the form
    var params = [{
        name: "First Name",
        key: "firstname",
    }, {
        name: "Last Name",
        key: "lastname",
    }, {
        name: "E-mail",
        key: "email"
    }]

    // Setup form configuration
    $scope.configuration = {
        object: $scope.users[0],
        onSave: save,
        onCancel: cancel,
        params: params
     }

     function save(){
        alert('Save Function Called')
     }

     function cancel(){
        alert('Cancel Function Called')
     }

     function customOnClickFunction(){
        alert('This item can do something when clicked')
     }
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
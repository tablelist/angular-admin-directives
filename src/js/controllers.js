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

    $scope.currentQuery = {};
    $scope.currentSortBy = '-created';
    $scope.queryTotal = UserService.queryTotal({}, '-created');

    // Configure Query Directive
    $scope.queryConfig = {
        properties: getQueryProperties(),
        comparators: getExtraComparators(),
        refComparators: [{
            resources: $scope.cities,
            refType: "city"
        }],
        // callback to run when query changes
        queryUpdatedCallback: function (mongoQuery, sortBy) {
            $scope.currentQuery =  mongoQuery;
            $scope.currentSortBy = sortBy;
            $scope.users = UserService.query(mongoQuery, sortBy);
            $scope.queryTotal = UserService.queryTotal(mongoQuery, sortBy);
        }
    }

    // Configure Export Directive
    $scope.exportConfig = {
        exportUrl: function() {
            return UserService.exportUrl($scope.currentQuery, $scope.currentSortBy);
        }
    }
  }]);

demoControllers.controller('DetailsPanelCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.users = User.query();

    $scope.configuration = {};

    var params = [{
        name: "ID",
        key: "id",
        editable: false
    }, {
        name: "Name",
        key: "name",
    }, {
        name: "E-mail",
        key: "email"
    }];

    $scope.configuration = {
        object: $scope.users[0],
        onSave: save,
        params: params
    }
  }]);
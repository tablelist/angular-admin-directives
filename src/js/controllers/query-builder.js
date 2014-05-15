var app = angular.module('app');


app.controller('QueryBuilderCtrl', ['$scope',
  function($scope) {

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
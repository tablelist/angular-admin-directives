var app = angular.module('app');


app.controller('QueryBuilderCtrl', ['$scope',
  function($scope) {

    console.log($scope)

    $scope.currentQuery = {};
    $scope.currentSortBy = '-created';
    // $scope.queryTotal = UserService.queryTotal({}, '-created');

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
            // $scope.users = UserService.query(mongoQuery, sortBy);
            // $scope.queryTotal = UserService.queryTotal(mongoQuery, sortBy);
        }
    }

    // Configure Export Directive
    $scope.exportConfig = {
        exportUrl: function() {
            // return UserService.exportUrl($scope.currentQuery, $scope.currentSortBy);
        }
    }

    function getQueryProperties() {
        return [{
            key: "location.primary",
            name: "City",
            dataType: "ref",
            refType: "city"
        }, {
            key: "birthday",
            name: "Birthday",
            dataType: "date"
        }, {
            key: "gender",
            name: "Gender",
            dataType: "gender",
            hideText: true
        }, {
            key: "created",
            name: "Registered Date",
            dataType: "date"
        }, {
            key: "firstName",
            name: "First Name",
            dataType: "string"
        }, {
            key : "lastName",
            name: "Last Name",
            dataType: "string"
        }, {
            key : "phone",
            name: "Phone Number",
            dataType: "string"
        }, {
            key : "email",
            name: "E-mail Address",
            dataType: "string"
        }, {
            key: "bookingCount",
            name: "Bookings",
            dataType: "int"
        }, {
            key: "joinCount",
            name: "Joined Bookings",
            dataType: "int"
        }, {
            key: "referralCount",
            name: "Referrals",
            dataType: "int"
        }, {
            key: "referral.referralType",
            name: "Referred By",
            dataType: "referralType",
            hideText: "true"
        }, {
            key : "referralCode",
            name: "Referral Code",
            dataType: "string"
        }, {
            key: "credit",
            name: "Credit Amount",
            dataType: "int"
        }, {
            key: "creditTransactions",
            name: "Credit Transactions Count",
            dataType: "int"
        }, {
            key: "points",
            name: "Points",
            dataType: "int"
        }, {
            key: "totalPoints",
            name: "Points (Lifetime)",
            dataType: "int"
        }, {
            key: "ambassador",
            name: "Ambassador",
            dataType: "boolean"
        }, {
            key: "promoter",
            name: "Promotor",
            dataType: "boolean"
        }, {
            key: "admin",
            name: "Admin",
            dataType: "boolean"
        }, {
            key: "staff",
            name: "Staff",
            dataType: "boolean"
        }, {
            key: 'membershipLevel',
            name: 'Membership Level',
            dataType: 'int'
        }]
    }

    function getExtraComparators() {
        return [{
            name : "User",
            expression : "user",
            dataType : "referralType"
        }, {
            name : "Promo",
            expression : "promo",
            dataType : "referralType"
        }, {
            name : "exists",
            expression : { $ne : null, $exists: true },
            dataType : "any",
            key: "phone",
            hideText: true
        }, {
            name: "Male",
            expression: "male",
            dataType: "gender",
            hideText: true
        }, {
            name: "Female",
            expression: "female",
            dataType: "gender",
            hideText: true
        }]
    }
  }]);
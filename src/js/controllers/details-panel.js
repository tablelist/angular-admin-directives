var app = angular.module('app');

app.controller('DetailsPanelCtrl', ['$scope',
  function($scope) {

    $scope.users.$promise.then(function (result) {

      $scope.configuration = {
          object: $scope.users[0],
          onSave: save,
          params: params
      }
    });

    var params = [{
        name: "First Name",
        key: "firstname",
    }, {
        name: "Last Name",
        key: "lastname",
    }, {
        name: "E-mail",
        key: "email"
    }, {
        name: "City",
        key: "city",
        editable: false,
    },{
        name: "PIN",
        key: "pin",
        type: "int",
    },{
        name: "Location",
        key: "location",
        editable: false,
    },{
        name: "Credit",
        key: "credit",
        type: "currency"
    },{
        name: "Created",
        key: "created",

    },{
        name: "Updated",
        key: "updated",
        type: "time"
    }]


    function save(){
      alert('Save Function Called')
    }

    function cancel(){
      alert('Cancel Function Called')
    }
  }]);
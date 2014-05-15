angular.module('directives.details-panel', [])
.controller('DetailsPanelDirectiveController', ['$scope', function($scope) {

    console.log($scope.config);

    $scope.getValue = function(param) {
        var object = $scope.config.object;

        // If we have a key for our current object
        if (param.key){
            var keysParts = param.key.split('.');

            angular.forEach(keysParts, function (keyPart) {
                object = object ? object[keyPart] : null;
            });

            return object;
        // If we have a function to get the value for the given field
        } else if (param.getValue){
            return param.getValue(object)
        }
    }

    $scope.click = function(param){
        if (param.onClick) param.onClick($scope.config.object);
    }
}])

.directive('detailsPanel', function(){
	return {
		restrict: 'E',
		template: '<div class="panel panel-default"> \
            <div class="panel-heading"><strong>{{name}}</strong></div>\
            <div class="panel-body"><div class="row" ng-repeat="param in config.params">\
                    <div class="col-md-5"><strong>{{param.name}}</strong></div>\
                    <div ng-switch on="param.type" ng-click="click(param)" ng-class="{ link: param.onClick }">\
                        <!-- Currency --><div class="col-md-6" ng-switch-when="currency">{{getValue(param) | currency}}</div>\
                        <!-- Date --><div class="col-md-6" ng-switch-when="date">{{getValue(param) | utc | date: "EEEE - MM/dd/yyyy"}}</div>\
                        <!-- Time --><div class="col-md-6" ng-switch-when="time">{{getValue(param) | utc | date: "h:mma"}}</div>\
                        <!-- Array --><div class="col-md-6" ng-switch-when="array"><span ng-repeat="item in config.object[param.value]">{{item}}</span></div>\
                        <!-- Array --><div class="col-md-6" ng-switch-when="html">Read on the right</div>\
                        <!-- Non-editable --><div class="col-md-6" ng-switch-when="non-editable">{{getValue(param)}}</div>\
                        <!-- Default (String) --><div class="col-md-6" ng-switch-default>{{getValue(param)}}</div>\
                    </div></div></div></div>',
		controller: 'DetailsPanelDirectiveController',
		scope: {
			name: '@',
			config:  '=',
		},
	}
})
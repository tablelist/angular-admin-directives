angular.module('directives.details-panel', [])
.controller('DetailsPanelCtrl', ['$scope', 'Alert', function($scope, Alert) {

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
		templateUrl: '/common/directives/details-panel/details-panel.tpl.html',
		controller: 'DetailsPanelCtrl',
		scope: {
			name: '@',
			config:  '=',
		},
	}
})
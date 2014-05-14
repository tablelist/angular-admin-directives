angular.module('directives.panel-builder', [])
.controller('PanelBuilderCtrl', ['$scope', function($scope) {
}])

.directive('panel', function(){
	return {
		restrict: 'E',
		transclude: true,
		template: '<div class="panel panel-default"><div class="panel-heading" ng-click="collapsed = !collapsed"><strong>{{name}}</strong></div><div collapse="collapsed"><div class="panel-body"><div ng-transclude></div></div></div></div>',
		controller: 'PanelBuilderCtrl',
		scope: {
			name: '@',
		},
	}
})

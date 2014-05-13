angular.module('directives.panel-builder', [])
.controller('PanelBuilderCtrl', ['$scope', function($scope) {
}])

.directive('panel', function(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/common/directives/panel-builder/panel-builder.tpl.html',
		controller: 'PanelBuilderCtrl',
		scope: {
			name: '@',
		},
	}
})

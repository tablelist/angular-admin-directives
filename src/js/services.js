'use strict';

/* Services */

var demoServices = angular.module('demoServices', ['ngResource']);

demoServices.factory('User', ['$resource',
  function($resource){
    return $resource('data/:user.json', {}, {
      query: {method:'GET', params:{user:'users'}, isArray:true}
    });
  }]);

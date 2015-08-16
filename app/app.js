'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'myApp.main',
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'kompasroosServices',
    'translationServices'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
    }]);

var queryParamsApp = angular.module("queryParamsApp", ['ngSanitize', 'ngRoute'], function($locationProvider) {
    $locationProvider.html5Mode(true);
});

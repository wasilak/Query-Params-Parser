var queryParamsApp = angular.module("queryParamsApp", ['ngSanitize'], function($locationProvider) {
    $locationProvider.html5Mode(true);
});

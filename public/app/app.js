/* jslint node: true */
"use strict";

/* global angular */
var queryParamsApp = angular.module("queryParamsApp", ['ngSanitize', 'ngRoute'], function($locationProvider) {
    $locationProvider.html5Mode(true);
});

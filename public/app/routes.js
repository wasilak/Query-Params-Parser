/* jslint node: true */
"use strict";

/* global queryParamsApp */
queryParamsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      }).
      when('/:hash', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      });
  }]
);

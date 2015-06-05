/* jslint node: true */
"use strict";

/* global queryParamsApp */
queryParamsApp.controller("MainController", ['$scope', '$routeParams', 'urlModel', function($scope, $routeParams,urlModel) {
    var mainCtrl =this;

    mainCtrl.urlModel = urlModel;

    // getting saved URL hash from request
    mainCtrl.urlModel.getFromDB($routeParams.hash);

    // watching input field
    $scope.$watch('mainCtrl.urlModel.input', function() {
        mainCtrl.urlModel.setRawUrl();
    });

    // watching url/host field
    $scope.$watch('mainCtrl.urlModel.urlWithoutParams', function() {
        mainCtrl.urlModel.setOutputUrl();
    });

    // watching URL hash field
    $scope.$watch('mainCtrl.urlModel.urlHash', function() {
        mainCtrl.urlModel.setOutputUrl();
    });

    // watching query params encode checkbox
    $scope.$watch('mainCtrl.urlModel.encodeURI', function() {
        mainCtrl.urlModel.setEncoding();
    });

    // watching query params field
    $scope.$watch('mainCtrl.urlModel.queryParams', function() {
        mainCtrl.urlModel.setOutputUrl();
    }, true);

}]);

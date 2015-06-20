/* jslint node: true */
/* jslint jasmine: true */

//"use strict";

describe('MainController', function() {
  beforeEach(module('queryParamsApp'));

  var $controller;

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  describe('$scope.grade', function() {
    var $scope, controller;

    beforeEach(function() {
        // mocking $scope with $watch, etc.
        $scope = $rootScope.$new();
        controller = $controller('MainController', { $scope: $scope });
    });

    it('automatically parses given URL in input into urlModel', function() {
        var testURL = new URL('http://onet.pl?aaa=bbb#1234');

        for (var key in testURL) {
            console.log(key + ": " + testURL[key]);

        }
        controller.urlModel.input = testURL.href;
        $scope.$digest();

        expect(testURL.href).toEqual(controller.urlModel.output.url);
        expect(testURL.href).toEqual(controller.urlModel.rawUrl.href);
        expect(testURL.hash).toEqual(controller.urlModel.rawUrl.hash);
        expect(testURL).toEqual(controller.urlModel.rawUrl);
    });
  });
});

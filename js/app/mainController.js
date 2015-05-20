queryParamsApp.controller("mainController", ['$scope', '$location', '$sce', 'utilsService', function($scope, $location, $sce, utilsService) {
    var mainCtrl =this;

    mainCtrl.url = 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=';
    mainCtrl.urlWithoutParams = '';
    mainCtrl.outputUrl = '';
    mainCtrl.outputUrlDescription = '';
    mainCtrl.rawUrl = '';
    mainCtrl.queryParams = [];
    mainCtrl.newElement = {
        'name': '',
        'value': ''
    };
    mainCtrl.urlHash = '';

    mainCtrl.removeUrlParam = function(id) {
        mainCtrl.queryParams.splice(id, 1);
    };


    mainCtrl.addUrlParam = function() {
        if (mainCtrl.newElement.name.length > 0) {
            mainCtrl.queryParams.push(mainCtrl.newElement);
            mainCtrl.newElement = {
                'name': '',
                'value': ''
            };
        }
    };

    $scope.$watch('mainCtrl.url', function() {

        // reset
        mainCtrl.queryParams = [];
        mainCtrl.urlWithoutParams = '';

        mainCtrl.rawUrl = new URL(mainCtrl.url);

        mainCtrl.urlHash = '';
        if (mainCtrl.rawUrl.hash.length > 0) {
            mainCtrl.urlHash = mainCtrl.rawUrl.hash.substr(1);
        }

        mainCtrl.queryParams = utilsService.paramsStringToArray(mainCtrl.rawUrl.search.substr(1));
        mainCtrl.urlWithoutParams = mainCtrl.rawUrl.origin + mainCtrl.rawUrl.pathname;

        updateOutpuUrl();
    });

    var updateOutpuUrl = function() {
        mainCtrl.outputUrl = '';
        
        if (mainCtrl.url.length > 0 && mainCtrl.queryParams.length > 0) {
            var tmp = utilsService.paramsArrayToString(mainCtrl.queryParams);
            mainCtrl.outputUrl = mainCtrl.urlWithoutParams + '?' + tmp.val;
            mainCtrl.outputUrlDescription = $sce.trustAsHtml(mainCtrl.urlWithoutParams + '?' + tmp.desc);
        }

        if (mainCtrl.urlHash.length > 0) {
            mainCtrl.outputUrl = mainCtrl.outputUrl + '#' + mainCtrl.urlHash;
        }
    }

    $scope.$watch('mainCtrl.urlHash', function() {
        updateOutpuUrl();
    });

    $scope.$watch('mainCtrl.queryParams', function() {
        updateOutpuUrl();
    }, true);

    $scope.$watch('mainCtrl.urlWithoutParams', function() {
        updateOutpuUrl();
    }, true);
}]);

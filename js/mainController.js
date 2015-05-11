queryParamsApp.controller("mainController", function ($scope, $location) {
    var mainCtrl = this;

    mainCtrl.url = 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=';
    mainCtrl.urlWithoutParams = '';
    mainCtrl.outputUrl = '';
    mainCtrl.queryParams = [];
    mainCtrl.newElement = {
        'name': '',
            'value': ''
    };
    mainCtrl.urlHash = '';

    mainCtrl.removeUrlParam = function (id) {
        mainCtrl.queryParams.splice(id, 1);
    };


    mainCtrl.addUrlParam = function () {
        mainCtrl.queryParams.push(mainCtrl.newElement);
        mainCtrl.newElement = {
            'name': '',
                'value': ''
        };
    };

    var paramsStringToArray = function (paramsString) {
        if (paramsString.length > 0) {
            paramsString = paramsString.split("&");
            var paramsArray = [];
            for (var paramId in paramsString) {
                var tmp = paramsString[paramId].split('=');
                paramsArray.push({
                    'name': tmp[0],
                        'value': tmp[1]
                });
            }

            mainCtrl.queryParams = paramsArray;
            mainCtrl.urlWithoutParams = url.origin + url.pathname;
        }
    };

    var paramsArrayToString = function () {
        if (mainCtrl.url.length > 0 && mainCtrl.queryParams.length > 0) {
            var tmp = [];
            for (var paramId in mainCtrl.queryParams) {
                var tmpParam = mainCtrl.queryParams[paramId];
                tmp.push(tmpParam.name + '=' + tmpParam.value);
            }

            mainCtrl.outputUrl = mainCtrl.urlWithoutParams + '?' + tmp.join('&');
        }
    };

    $scope.$watch('mainCtrl.url', function () {

        // reset
        mainCtrl.queryParams = [];
        mainCtrl.urlWithoutParams = '';

        var url = new URL(mainCtrl.url);

        mainCtrl.urlHash = '';
        if (url.hash.length > 0) {
            mainCtrl.urlHash = url.hash.substr(1);
        }

        paramsStringToArray(url.search.substr(1));

        updateOutpuUrl();
    });

    var updateOutpuUrl = function () {
        mainCtrl.outputUrl = '';

        paramsArrayToString();

        if (mainCtrl.urlHash.length > 0) {
            mainCtrl.outputUrl = mainCtrl.outputUrl + '#' + mainCtrl.urlHash;
        }
    };

    $scope.$watch('mainCtrl.urlHash', function () {
        updateOutpuUrl();
    });

    $scope.$watch('mainCtrl.queryParams', function () {
        updateOutpuUrl();
    }, true);
});

queryParamsApp.controller("mainController", ['$scope', '$location', '$sce', function($scope, $location, $sce) {
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

    var paramsStringToArray = function(paramsString) {
        if (paramsString.length > 0) {
                paramsString = paramsString.split("&");
                var paramsArray = [];
                for (paramId in paramsString) {
                    var tmp = paramsString[paramId].split('=');
                    paramsArray.push({
                        'name': tmp[0],
                        'value': tmp[1]
                    });
                }

            mainCtrl.queryParams = paramsArray;
            mainCtrl.urlWithoutParams = mainCtrl.rawUrl.origin + mainCtrl.rawUrl.pathname;
        }
    };

    var paramsArrayToString = function() {
        if (mainCtrl.url.length > 0 && mainCtrl.queryParams.length > 0) {
            var tmp = [], tmpDesc = [];
            for (paramId in mainCtrl.queryParams) {
                var tmpParam = mainCtrl.queryParams[paramId];
                tmp.push(tmpParam.name + '=' + tmpParam.value);
                tmpDesc.push('<span style="color: ' + getRandomColor() + ';">' + tmpParam.name + '=' + tmpParam.value + '</span>');
            }

            mainCtrl.outputUrl = mainCtrl.urlWithoutParams + '?' + tmp.join('&');
            mainCtrl.outputUrlDescription = $sce.trustAsHtml(mainCtrl.urlWithoutParams + '?' + tmpDesc.join('&'));
        }
    }

    var getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $scope.$watch('mainCtrl.url', function() {

        // reset
        mainCtrl.queryParams = [];
        mainCtrl.urlWithoutParams = '';

        mainCtrl.rawUrl = new URL(mainCtrl.url);

        mainCtrl.urlHash = '';
        if (mainCtrl.rawUrl.hash.length > 0) {
            mainCtrl.urlHash = mainCtrl.rawUrl.hash.substr(1);
        }

        paramsStringToArray(mainCtrl.rawUrl.search.substr(1));

        updateOutpuUrl();
    });

    var updateOutpuUrl = function() {
        mainCtrl.outputUrl = '';
        
        paramsArrayToString();

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
}]);

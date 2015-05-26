queryParamsApp.controller("mainController", ['$scope', '$location', '$sce', 'utilsService', function($scope, $location, $sce, utilsService) {
    var mainCtrl =this;

    mainCtrl.input = 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=';
    mainCtrl.output = {
        url: '',
        description: ''
    };

    // our custom URL model
    // TODO: will be replaced with model prefilled with AJAX etc.
    mainCtrl.urlModel = {
        url: 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=',
        rawUrl: new URL(mainCtrl.input),
        urlWithoutParams: '',
        queryParams: [],
        urlHash: '',
        newElement: {
            'name': '',
            'value': ''
        },

        removeUrlParam: function(id) {
            this.queryParams.splice(id, 1);
        },

        addUrlParam: function() {
            if (this.newElement.name.length > 0) {
                this.queryParams.push(this.newElement);
                this.newElement = {
                    'name': '',
                    'value': ''
                };
            }
        },

        reset: function() {
            this.queryParams = [];
            this.urlWithoutParams = '';
        },

        addHash: function() {
            if (this.urlHash.length > 0) {
                return '#' + this.urlHash;
            }

            return '';
        }
    };

    $scope.$watch('mainCtrl.input', function() {

        // reset
        mainCtrl.urlModel.reset();

        mainCtrl.urlModel.rawUrl = new URL(mainCtrl.input);

        mainCtrl.urlModel.urlHash = '';
        if (mainCtrl.urlModel.rawUrl.hash.length > 0) {
            mainCtrl.urlModel.urlHash = mainCtrl.urlModel.rawUrl.hash.substr(1);
        }

        mainCtrl.urlModel.queryParams = utilsService.paramsStringToArray(mainCtrl.urlModel.rawUrl.search.substr(1));
        mainCtrl.urlModel.urlWithoutParams = mainCtrl.urlModel.rawUrl.origin + mainCtrl.urlModel.rawUrl.pathname;

        updateOutpuUrl();
    });

    var updateOutpuUrl = function() {
        mainCtrl.output.url = '';

        if (mainCtrl.input.length > 0 && mainCtrl.urlModel.queryParams.length > 0) {
            var tmp = utilsService.paramsArrayToString(mainCtrl.urlModel.queryParams);
            mainCtrl.output.url = mainCtrl.urlModel.urlWithoutParams + '?' + tmp.val + mainCtrl.urlModel.addHash();
            mainCtrl.output.description = $sce.trustAsHtml(mainCtrl.urlModel.urlWithoutParams + '?' + tmp.desc + mainCtrl.urlModel.addHash());
        }
    };

    $scope.$watch('mainCtrl.urlModel.urlHash', function() {
        updateOutpuUrl();
    });

    $scope.$watch('mainCtrl.urlModel.queryParams', function() {
        updateOutpuUrl();
    }, true);

}]);

/**
* URL model, handling all data related logic and using Utils service
*/
/*global $:false */
/* jslint node: true */
"use strict";

/* global queryParamsApp */
/* global URL */
queryParamsApp.factory('urlModel', ['$http', 'utilsService', '$sce', '$location', function($http, utilsService, $sce, $location) {

    var urlModel = {
        input: '',
        output: {
            url: '',
            description: ''
        },
        hash: '',
        rawUrl: new URL(''),
        urlWithoutParams: '',
        queryParams: [],
        urlHash: '',
        newElement: {
            'name': '',
            'value': ''
        },
        encodeURI: true,

        modal: {
            header: 'Loading...',
            message: '',
            hash: '',
            url: ''
        },

        removeUrlParam: function(id) {
            this.queryParams.splice(id, 1);
        },

        addUrlParam: function() {
            if (undefined === this.queryParams) {
                this.queryParams = [];
            }
            if (this.newElement.name.length > 0) {
                this.queryParams.push(this.newElement);
                this.newElement = {
                    'name': '',
                    'value': ''
                };
            }
        },

        addHash: function() {
            if (this.urlHash.length > 0) {
                return '#' + this.urlHash;
            }

            return '';
        },

        getFromDB: function(hash) {
            var me = this;
            this.hash = hash;

            if (this.hash) {
                $http.get('/api/get/' + this.hash).success(function(data) {
                    if (!data.error) {
                        var urlFromDB = new URL(data.url);
                        me.input = urlFromDB.href;
                    } else {
                        console.log(data);
                    }
                });
            }
        },

        goToHashUrl: function() {
            $('#modal_message').modal('hide');
            $location.path('/' + this.hash);
        },

        saveToDB: function() {
          var me = this;

          var url = false;
          try {
            url = new URL(this.output.url);
          } catch(error) {
            console.log('Invalid URL...');
          }

          if (url) {
              $http.post('/api/save/' + encodeURIComponent(url.href) + '/' + this.hash).success(function(data) {
                console.log(data);

                if (data.error === false) {
                    me.modal.header = data.message;
                    me.modal.message = 'Unique hash of your URL:';
                    me.modal.hash = data.hash;

                    me.hash = data.hash;

                    var port = ($location.port() != '80' && $location.port() != '443') ? ':' + $location.port() : '';
                    me.modal.url = $location.protocol() + '://' + $location.host() + port + '/' + data.hash;

//                    if('insert' === data.type) {
//                        me.goToHashUrl();
//                    }
                } else {

                    me.modal.header = 'Something went wrong... :/';
                }
              });
          }
        },

        setRawUrl: function() {
            this.rawUrl = new URL('');
            try {
                this.rawUrl = new URL(this.input);
            } catch (error) {
            }

            this.urlHash = '';
            if (this.rawUrl.hash && this.rawUrl.hash.length > 0) {
                this.urlHash = this.rawUrl.hash.substr(1);
            }

            this.queryParams = utilsService.paramsStringToArray(this.rawUrl.search.substr(1));

            this.urlWithoutParams = '';
            if ('null' != this.rawUrl.origin) {
                this.urlWithoutParams = this.rawUrl.origin + this.rawUrl.pathname;
            }

            this.setOutputUrl();
        },

        setOutputUrl: function() {
            this.output.url = '';
            if ('null' != this.rawUrl.origin) {

                var tmp = utilsService.paramsArrayToString(this.queryParams);
                this.output.url = this.urlWithoutParams + tmp.val + this.addHash();
                this.output.description = $sce.trustAsHtml(this.urlWithoutParams + tmp.desc + this.addHash());
            }
        },

        setEncoding: function() {

            this.encodeDecodeParams();
            utilsService.encodeURI = this.encodeURI;
        },

        encodeDecodeParams: function() {

            for (var id in this.queryParams) {
                this.queryParams[id].value = utilsService.encodeURI ? decodeURIComponent(this.queryParams[id].value) : encodeURIComponent(this.queryParams[id].value);
            }
        }
    };

    return urlModel;
}]);

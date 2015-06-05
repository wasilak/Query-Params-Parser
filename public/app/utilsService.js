/* jslint node: true */
"use strict";

/* global queryParamsApp */
queryParamsApp.factory('utilsService', function() {

    var serviceData = {
        encodeURI: true,
        getRandomColor: function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        paramsStringToArray: function(paramsString) {
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

                return paramsArray;
            }
        },

        paramsArrayToString: function(queryParams) {
            var tmp = [], tmpDesc = [];
            for (var paramId in queryParams) {
                var tmpParam = queryParams[paramId];
                tmp.push(tmpParam.name + '=' + (this.encodeURI ? tmpParam.value : encodeURIComponent(tmpParam.value)));

                // random coloring query params
                // tmpDesc.push('<span style="color: ' + serviceData.getRandomColor() + ';">' + tmpParam.name + '=' + tmpParam.value + '</span>');

                // no coloring
                tmpDesc.push(tmpParam.name + '=' + tmpParam.value);
            }

            var tmpString = '';
            if (tmp.length > 0) {
                tmpString = '?' + tmp.join('&');
            }

            var tmpStringDesc = '';
            if (tmpDesc.length > 0) {
                tmpStringDesc = '?' + tmpDesc.join('&');
            }

            return {
                val: tmpString,
                desc: tmpStringDesc
            };
        }
    };

    return serviceData;
});

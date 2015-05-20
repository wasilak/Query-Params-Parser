queryParamsApp.factory('utilsService', function() {

    var serviceData = {};

    serviceData.getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    serviceData.paramsStringToArray = function(paramsString) {
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

            return paramsArray;
        }
    };

    serviceData.paramsArrayToString = function(queryParams) {
        var tmp = [], tmpDesc = [];
        for (paramId in queryParams) {
            var tmpParam = queryParams[paramId];
            tmp.push(tmpParam.name + '=' + tmpParam.value);
            tmpDesc.push('<span style="color: ' + serviceData.getRandomColor() + ';">' + tmpParam.name + '=' + tmpParam.value + '</span>');
        }

        return {
            val: tmp.join('&'),
            desc: tmpDesc.join('&')
        };
    }

    return serviceData;
});

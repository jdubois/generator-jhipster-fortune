(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('Fortune', Fortune);

    Fortune.$inject = ['$resource'];

    function Fortune ($resource) {
        var service = $resource('api/fortune', {}, {
            'get': {method: 'GET'}
        });

        return service;
    }
})();

'use strict';

angular.module('<%=angularAppName%>')
    .factory('Fortune', function ($resource) {
        return $resource('api/fortune', {}, {
                'get': { method: 'GET' }
            });
        });

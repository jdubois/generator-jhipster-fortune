'use strict';

angular.module('<%=angularAppName%>')
    .controller('FortuneController', function ($scope, Fortune) {
        $scope.fortune = Fortune.get();

        $scope.refresh = function() {
            $scope.fortune = Fortune.get();
        }
    });

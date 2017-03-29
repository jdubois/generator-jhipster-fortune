(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('FortuneController', FortuneController);

    FortuneController.$inject = ['$scope', 'Fortune'];

    function FortuneController ($scope, Fortune) {
        var vm = this;
        vm.fortune = Fortune.get();

        vm.refresh = function () {
          vm.fortune = Fortune.get();
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('fortune', {
            parent: 'app',
            url: '/fortune',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.fortune'
            },
            views: {
                'content@': {
                    templateUrl: 'app/fortune/fortune.html',
                    controller: 'FortuneController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('fortune');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

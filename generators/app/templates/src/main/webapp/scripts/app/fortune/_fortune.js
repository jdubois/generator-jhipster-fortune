'use strict';

angular.module('<%=angularAppName%>')
    .config(function ($stateProvider) {
        $stateProvider
            .state('fortune', {
                parent: 'site',
                url: '/fortune',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.fortune'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/fortune/fortune.html',
                        controller: 'FortuneController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('fortune');
                        return $translate.refresh();
                    }]
                }
            });
    });

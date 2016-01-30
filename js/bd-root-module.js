var bd = angular.module('bd', ['ui.router']);
bd.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'service_home.html'
        })
        .state('business-intelligence', {
            url: '/business-intelligence',
            templateUrl: 'business-intelligence.html'
        })
        .state('data-warehousing', {
            url: '/data-warehousing',
            templateUrl: 'data-warehousing.html'
        })
        .state('cloud', {
            url: '/cloud',
            templateUrl: 'cloud.html'
        })
}]);

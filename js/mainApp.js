var bd = angular.module('bd', ['ui.router']);
bd.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/business-intelligence');
    
    $stateProvider
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
bd.controller('bdSearchCtrl', function($scope,$http,$location){    
    
})

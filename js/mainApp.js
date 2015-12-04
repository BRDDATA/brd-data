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
    $scope.searchMethod = function(searchString){
        searchString = searchString || $location.search().q;
        if(searchString){
             $http.get('/search',{
                params: { searchString: searchString}
            }).then(function(response){
                $scope.searchResult = response.data;
            },function(err){
                console.log(err);
            })
        }
       
    }
    $scope.searchMethod();
    $scope.showSearch = false;
    $scope.toggle = function(){
        console.log('called');
        $scope.showSearch = !$scope.showSearch;
    }
})

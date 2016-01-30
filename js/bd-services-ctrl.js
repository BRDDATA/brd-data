bd.controller('bdServicesCtrl', function($scope, $rootScope, $timeout){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        $scope.currentState = toState.name.replace('-', ' ');        
        $timeout(function() {
            $scope.hideDropdown = false;
        }, 0);
     })
    $rootScope.$on('$stateChangeStart', function(event){         
        $scope.hideDropdown = true;        
     })
})

angular.module('app').controller('SeriiController', function($scope, Restangular, $stateParams){
    console.log("Salut!", $stateParams.sc);
    $scope.filters ={
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null
    };

    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.sc', loadSerii);
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadSerii();
    });

    function loadSerii() {
        Restangular.all('api/serii').getList({
            sc: $scope.filters.sc,
            f: $scope.filters.f
        }).then(function (response) {
            $scope.serii = response.plain();
        });
    }

    function loadSectii(){
        Restangular.all('api/sectii').getList({f: $scope.filters.f}).then(function (response) {
            $scope.sectii = response.plain();
        });
    }

});
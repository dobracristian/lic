angular.module('app').controller('GrupeController', function($scope, Restangular, $stateParams){
    console.log('Salut!', $stateParams.ser);
    $scope.filters = {
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null
    };

    Restangular.all('api/facultati').getList().then(function (response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.ser', loadGrupe);
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadGrupe();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadGrupe();
    });

    function loadGrupe() {
        Restangular.all('api/grupe').getList({
            ser: $scope.filters.ser,
            sc: $scope.filters.sc,
            f: $scope.filters.f
        }).then(function(response) {
            $scope.grupe = response.plain();
        });
    }

    function loadSerii() {
        Restangular.all('api/serii').getList({
            sc: $scope.filters.sc
        }).then(function (response) {
            $scope.serii = response.plain();
        });
    }

    function loadSectii() {
        Restangular.all('api/sectii').getList({
            f: $scope.filters.f
        }).then(function (response) {
            $scope.sectii = response.plain();
        });
    }

});

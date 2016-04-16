angular.module('app').controller('SemigrupeController', function($scope, Restangular, $stateParams){
    console.log('Salut!', $stateParams.gr);
    $scope.filters = {
        gr: Number($stateParams.gr) || null,
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null
    };

    Restangular.all('api/facultati').getList().then(function (response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.gr', loadSemigrupe);
    $scope.$watch('filters.ser', function() {
        if(!$scope.filters.ser) {
            $scope.filters.gr = null;
        }
        else {
            loadGrupe();
        }
        loadSemigrupe();
    });
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadSemigrupe();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadSemigrupe();
    });

    function loadSemigrupe() {
        Restangular.all('api/semigrupe').getList({
            gr: $scope.filters.gr,
            ser: $scope.filters.ser,
            sc: $scope.filters.sc,
            f: $scope.filters.f
        }).then(function(response) {
            $scope.semigrupe = response.plain();
        });
    }

    function loadGrupe() {
        Restangular.all('api/grupe').getList({
            ser: $scope.filters.ser
        }).then(function (response) {
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
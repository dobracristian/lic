angular.module('app').controller('GrupeController', function($scope, Restangular, $stateParams, $uibModal, L){
    console.log('Salut!', $stateParams.ser);
    $scope.filters = {
        ser: Number($stateParams.ser) || null,
        an:  Number($stateParams.an) || null,
        sc:  Number($stateParams.sc) || null,
        f:   Number($stateParams.f) || null
    };

    L.ani($scope, 'ani');

    Restangular.all('api/facultati').getList().then(function (response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.ser', loadGrupe);
    $scope.$watch('filters.an', function() {
        loadSerii();
        loadGrupe();
    });
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
            an:  $scope.filters.an,
            sc:  $scope.filters.sc,
            f:   $scope.filters.f
        }).then(function(response) {
            $scope.grupe = response.plain();
        });
    }

    function loadSerii() {
        Restangular.all('api/serii').getList({
            an: $scope.filters.an,
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

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/grupe', id).remove().then(loadGrupe);
        }
    };

    $scope.edit = function (grupa) {

        var modalScope = $scope.$new();
        modalScope.grupa = angular.copy(grupa);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/grupa.html',
            controller: 'AdminGrupeController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadGrupe);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.grupa = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            an:           $scope.filters.an,
            id_serie:     $scope.filters.ser
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/grupa.html',
            controller: 'AdminGrupeController',
            scope: modalScope
        }).result.then(loadGrupe);
    };

});

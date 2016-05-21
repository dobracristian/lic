angular.module('app').controller('SeriiController', function($scope, Restangular, $stateParams, $uibModal, L){
    console.log("Salut!", $stateParams.sc);
    $scope.filters ={
        an: Number($stateParams.an) || null,
        sc: Number($stateParams.sc) || null,
        f:  Number($stateParams.f) || null
    };

    L.ani($scope, 'ani');

    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.an', loadSerii);
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
            an: $scope.filters.an,
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

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/serii', id).remove().then(loadSerii);
        }
    };

    $scope.edit = function (serie) {

        var modalScope = $scope.$new();
        modalScope.serie = angular.copy(serie);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/serie.html',
            controller: 'AdminSerieController',
            scope: modalScope
        }).result.then(loadSerii);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.serie = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            an:           $scope.filters.an
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/serie.html',
            controller: 'AdminSerieController',
            scope: modalScope
        }).result.then(loadSerii);
    };

});
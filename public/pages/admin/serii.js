angular.module('app').controller('SeriiController', function($scope, Restangular, $stateParams, $uibModal){
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
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadSerii);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.serie = {
            id_sectie: $scope.filters.sc,
            id_facultate: $scope.filters.f
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/serie.html',
            controller: 'AdminSerieController',
            scope: modalScope
        }).result.then(loadSerii);
    };

});
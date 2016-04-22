angular.module('app').controller('CursuriController', function($scope, Restangular, $stateParams, $uibModal){
    console.log('Salut!');

    $scope.filters = {
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null,
        mat: Number($stateParams.mat) || null,
        prof: Number($stateParams.prof) || null
    };
    loadMaterii();
    loadProfesori();
    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.mat', loadCursuri);
    function loadMaterii() {
        Restangular.all('api/materii').getList().then(function(response) {
            $scope.materii = response.plain();
        });
    }

    $scope.$watch('filters.prof', loadCursuri);
    function loadProfesori() {
        Restangular.all('api/profesori').getList().then(function(response) {
            $scope.profesori = response.plain();
        });
    }

    $scope.$watch('filters.ser',loadCursuri);
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadCursuri();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadCursuri();
    });

    function loadCursuri() {
        Restangular.all('api/cursuri').getList($scope.filters).then(function(response) {
            $scope.cursuri = response.plain();
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

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/cursuri', id).remove().then(loadCursuri);
        }
    };

    $scope.edit = function (curs) {

        var modalScope = $scope.$new();
        modalScope.curs = angular.copy(curs);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/curs.html',
            controller: 'AdminCursController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadCursuri);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.curs = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            id_serie:     $scope.filters.ser,
            id_materie:   $scope.filters.mat,
            id_prof:      $scope.filters.prof
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/curs.html',
            controller: 'AdminCursController',
            scope: modalScope
        }).result.then(loadCursuri);

    }
});

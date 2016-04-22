angular.module('app').controller('SeminariiController', function($scope, Restangular, $stateParams, $uibModal){
    console.log('Salut!');
    $scope.filters= {
        gr: Number($stateParams.gr) || null,
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null,
        curs: Number($stateParams.curs) || null,
        prof: Number($stateParams.prof) || null
    };
    loadCursuri();
    loadProfesori();

    Restangular.all('api/facultati').getList().then(function (response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.curs', loadSeminarii);
    function loadCursuri() {
        Restangular.all('api/cursuri').getList().then(function (response) {
            $scope.cursuri = response.plain();
        });
    }

    $scope.$watch('filters.prof', loadSeminarii);
    function loadProfesori() {
        Restangular.all('api/profesori').getList().then(function (response) {
            $scope.profesori = response.plain();
        });
    }

    $scope.$watch('filters.gr', loadSeminarii);
    $scope.$watch('filters.ser', function() {
        if(!$scope.filters.ser) {
            $scope.filters.gr = null;
        }
        else {
            loadGrupe();
        }
        loadSeminarii();
    });
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadSeminarii();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadSeminarii();
    });

    function loadSeminarii() {
        Restangular.all('api/seminarii').getList($scope.filters).then(function(response) {
            $scope.seminarii = response.plain();
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

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/seminarii', id).remove().then(loadSeminarii);
        }
    };

    $scope.edit = function (seminar) {

        var modalScope = $scope.$new();
        modalScope.seminar = angular.copy(seminar);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/seminar.html',
            controller: 'AdminSeminarController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadSeminarii);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.seminar = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            id_serie:     $scope.filters.ser,
            id_grupa:     $scope.filters.gr,
            id_curs:      $scope.filters.curs,
            id_prof:      $scope.filters.prof
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/seminar.html',
            controller: 'AdminSeminarController',
            scope: modalScope
        }).result.then(loadSeminarii);

    }
});

angular.module('app').controller('LaboratoareController', function($scope, Restangular, $stateParams, $uibModal){
    console.log('Salut!');

    $scope.filters = {
        sgr: Number($stateParams.sgr) || null,
        gr: Number($stateParams.gr) || null,
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null,
        curs: Number($stateParams.curs) ||null,
        prof: Number($stateParams.curs) || null
    };
    loadCursuri();
    loadProfesori();

    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.curs', loadLaboratoare);
    function loadCursuri() {
        Restangular.all('api/cursuri').getList().then(function(response) {
            $scope.cursuri = response.plain();
        });
    }

    $scope.$watch('filters.prof', loadLaboratoare);
    function loadProfesori() {
        Restangular.all('api/profesori').getList().then(function(response) {
            $scope.profesori = response.plain();
        });
    }

    $scope.$watch('filters.sgr', loadLaboratoare);
    $scope.$watch('filters.gr', function() {
        if(!$scope.filters.gr) {
            $scope.filters.sgr = null;
        }
        else {
            loadSemigrupe();
        }
        loadLaboratoare();
    });
    $scope.$watch('filters.ser', function() {
        if(!$scope.filters.ser) {
            $scope.filters.gr = null;
        }
        else {
            loadGrupe();
        }
        loadLaboratoare();
    });
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadLaboratoare();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            loadSectii();
        }
        loadLaboratoare();
    });

    function loadLaboratoare(){
        Restangular.all('api/laboratoare').getList($scope.filters).then(function(response) {
            $scope.laboratoare = response.plain();
        });
    }

    function loadSemigrupe() {
        Restangular.all('api/semigrupe').getList({
            gr: $scope.filters.gr
        }).then(function (response) {
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

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/laboratoare', id).remove().then(loadLaboratoare);
        }
    };

    $scope.edit = function (laborator) {

        var modalScope = $scope.$new();
        modalScope.laborator = angular.copy(laborator);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/laborator.html',
            controller: 'AdminLaboratorController',
            scope: modalScope
        }).result.then(loadLaboratoare);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.laborator = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            id_serie:     $scope.filters.ser,
            id_grupa:     $scope.filters.gr,
            id_semigrupa: $scope.filters.sgr,
            id_curs:      $scope.filters.curs,
            id_prof:      $scope.filters.prof
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/laborator.html',
            controller: 'AdminLaboratorController',
            scope: modalScope
        }).result.then(loadLaboratoare);

    }
});

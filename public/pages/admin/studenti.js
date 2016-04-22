angular.module('app').controller('StudentiController', function($scope, Restangular, $stateParams, $uibModal, L){
    console.log('Salut!', $stateParams.sem);
    $scope.filters = {
        sem: Number($stateParams.sem) || null,
        gr: Number($stateParams.gr) || null,
        ser: Number($stateParams.ser) || null,
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null
    };
    //loadSectii();
    loadSerii();
    loadGrupe();
    loadSemigrupe();

    L.facultati($scope, 'facultati');

    $scope.$watch('filters.sem', loadStudenti);
    $scope.$watch('filters.gr', function() {
        if(!$scope.filters.gr) {
            $scope.filters.sem = null;
        }
        else {
            loadSemigrupe();
        }
        loadStudenti();
    });
    $scope.$watch('filters.ser', function() {
        if(!$scope.filters.ser) {
            $scope.filters.gr = null;
        }
        else {
            loadGrupe();
        }
        loadStudenti();
    });
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            loadSerii();
        }
        loadStudenti();
    });
    $scope.$watch('filters.f', function() {
        if(!$scope.filters.f) {
            $scope.filters.sc = null;
        }
        else {
            L.sectii($scope, 'sectii', $scope.filters.f);
        }
        loadStudenti();
    });

    function loadStudenti(){
        Restangular.all('api/studenti').getList({
            sem: $scope.filters.sem,
            gr: $scope.filters.gr,
            ser: $scope.filters.ser,
            sc: $scope.filters.sc,
            f: $scope.filters.f
        }).then(function(response) {
            $scope.studenti = response.plain();
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

    $scope.delete = function(id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('/api/studenti', id).remove().then(loadStudenti);
        }
    };

    $scope.edit = function (student) {

        var modalScope = $scope.$new();
        modalScope.student = angular.copy(student);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/student.html',
            controller: 'AdminStudentController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadStudenti);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.student = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            id_serie:     $scope.filters.ser,
            id_grupa:     $scope.filters.gr,
            id_semigrupa: $scope.filters.sem
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/student.html',
            controller: 'AdminStudentController',
            scope: modalScope
        }).result.then(loadStudenti);
    };
});
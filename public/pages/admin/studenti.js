angular.module('app').controller('StudentiController', function($scope, Restangular, $stateParams, $uibModal, L){
    console.log('Salut!', $stateParams.sgr);
    $scope.filters = {
        sgr: Number($stateParams.sgr) || null,
        gr:  Number($stateParams.gr) || null,
        ser: Number($stateParams.ser) || null,
        an:  Number($stateParams.an) ||null,
        sc:  Number($stateParams.sc) || null,
        f:   Number($stateParams.f) || null
    };

    L.ani($scope, 'ani');
    L.facultati($scope, 'facultati');

    $scope.$watch('filters.sgr', loadStudenti);
    $scope.$watch('filters.an', function() {
        L.serii($scope, 'serii', $scope.filters.sc, $scope.filters.an);
        L.grupe($scope, 'grupe', $scope.filters.ser);
        L.semigrupe($scope, 'semigrupe', $scope.filters.gr);
        loadStudenti();
    });
    $scope.$watch('filters.gr', function() {
        if(!$scope.filters.gr) {
            $scope.filters.sgr = null;
        }
        else {
            L.semigrupe($scope, 'semigrupe', $scope.filters.gr)
        }
        loadStudenti();
    });
    $scope.$watch('filters.ser', function() {
        if(!$scope.filters.ser) {
            $scope.filters.gr = null;
        }
        else {
            L.grupe($scope, 'grupe', $scope.filters.ser)
        }
        loadStudenti();
    });
    $scope.$watch('filters.sc', function() {
        if(!$scope.filters.sc) {
            $scope.filters.ser = null;
        }
        else {
            L.serii($scope, 'serii', $scope.filters.sc)
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
            sgr: $scope.filters.sgr,
            gr:  $scope.filters.gr,
            ser: $scope.filters.ser,
            an:  $scope.filters.an,
            sc:  $scope.filters.sc,
            f:   $scope.filters.f
        }).then(function(response) {
            $scope.studenti = response.plain();
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
        }).result.then(loadStudenti);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.student = {
            id_sectie:    $scope.filters.sc,
            id_facultate: $scope.filters.f,
            id_serie:     $scope.filters.ser,
            id_grupa:     $scope.filters.gr,
            id_semigrupa: $scope.filters.sgr
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/student.html',
            controller: 'AdminStudentController',
            scope: modalScope
        }).result.then(loadStudenti);
    };
});
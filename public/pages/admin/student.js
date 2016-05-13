angular.module('app').controller('AdminStudentController', function($scope, Restangular, L) {

    L.facultati($scope, 'facultati');
    $scope.$watch('student.fac_id', function(f) {
        L.sectii($scope, 'sectii', f);
    });
    $scope.$watch('student.sc_id', function(sc) {
        L.serii($scope, 'serii', sc);
    });
    $scope.$watch('student.ser_id', function(ser) {
        L.grupe($scope, 'grupe', ser);
    });
    $scope.$watch('student.gr_id', function(gr) {
        L.semigrupe($scope, 'semigrupe', gr);
    });

    $scope.save = function() {
        Restangular.one('api/studenti', $scope.student.id).customPUT($scope.student).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/studenti').post($scope.student).then($scope.$close);
    };

});
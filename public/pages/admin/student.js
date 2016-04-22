angular.module('app').controller('AdminStudentController', function($scope, Restangular, L) {

    L.facultati($scope, 'facultati');
    $scope.$watch('student.fac_id', function(f) {
        L.sectii($scope, 'sectii', f);
    });

    $scope.save = function() {
        Restangular.one('api/studenti', $scope.student.id).customPUT($scope.student).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/studenti').post($scope.student).then($scope.$close);
    };

});
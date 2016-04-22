angular.module('app').controller('AdminProfesorController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/profesori', $scope.profesor.id).customPUT($scope.profesor).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/profesori').post($scope.profesor).then($scope.$close);
    };

});
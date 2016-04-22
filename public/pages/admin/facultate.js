angular.module('app').controller('AdminFacController', function($scope, Restangular) {

    $scope.add = function() {
        Restangular.all('api/facultati').post($scope.facultate).then($scope.$close);
    };

    $scope.save = function() {
        Restangular.one('api/facultati', $scope.facultate.id).customPUT($scope.facultate).then($scope.$close);
    }
});
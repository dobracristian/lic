angular.module('app').controller('AdminGrupeController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/grupe', $scope.grupa.id).customPUT($scope.grupa).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/grupe').post($scope.grupa).then($scope.$close);
    };

});
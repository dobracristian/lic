angular.module('app').controller('AdminLaboratorController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/laboratoare', $scope.laborator.id).customPUT($scope.laborator).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/laboratoare').post($scope.laborator).then($scope.$close);
    };

});
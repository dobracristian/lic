angular.module('app').controller('AdminOrarController', function($scope, Restangular) {

    $scope.add = function() {
        Restangular.all('api/orar').post($scope.ora).then($scope.$close);
    };

    $scope.save = function() {
        Restangular.one('api/orar', $scope.ora.id).customPUT($scope.ora).then($scope.$close);
    }

});
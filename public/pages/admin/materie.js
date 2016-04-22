angular.module('app').controller('AdminMaterieController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/materii', $scope.materie.id).customPUT($scope.materie).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/materii').post($scope.materie).then($scope.$close);
    };

});
angular.module('app').controller('AdminAnController', function($scope, Restangular) {

    $scope.add = function() {
        Restangular.all('api/ani').post($scope.an).then($scope.$close);
    };

    $scope.save = function() {
        Restangular.one('api/ani', $scope.an.id).customPUT($scope.an).then($scope.$close);
    }
});
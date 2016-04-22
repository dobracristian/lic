angular.module('app').controller('AdminSemigrupeController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/semigrupe', $scope.semigrupa.id).customPUT($scope.semigrupa).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/semigrupe').post($scope.semigrupa).then($scope.$close);
    };
});
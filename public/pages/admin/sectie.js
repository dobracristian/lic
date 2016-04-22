angular.module('app').controller('AdminSectieController', function($scope, Restangular) {

    $scope.save = function () {
        Restangular.one('api/sectii', $scope.sectie.id).customPUT($scope.sectie).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/sectii').post($scope.sectie).then($scope.$close);
    };
});
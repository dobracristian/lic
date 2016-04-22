angular.module('app').controller('AdminSeminarController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/seminarii', $scope.seminar.id).customPUT($scope.seminar).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/seminarii').post($scope.seminar).then($scope.$close);
    };

});
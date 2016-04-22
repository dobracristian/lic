angular.module('app').controller('AdminSerieController', function($scope, Restangular) {

    $scope.save = function() {
        Restangular.one('api/serii', $scope.serie.id).customPUT($scope.serie).then($scope.$close);
    };

    $scope.add = function() {
        Restangular.all('api/serii').post($scope.serie).then($scope.$close);
    };


});
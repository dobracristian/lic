angular.module('app').controller('AdminCursController', function($scope, Restangular) {

    $scope.add = function() {
        Restangular.all('api/cursuri').post($scope.curs).then($scope.$close);
    };

    $scope.save = function() {
        Restangular.one('api/cursuri', $scope.curs.id).customPUT($scope.curs).then($scope.$close);
    }

})
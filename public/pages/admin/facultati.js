angular.module('app').controller('FacultatiController', function($scope, Restangular, $uibModal){
    console.log('Salut!');
    loadFacultati();

    function loadFacultati() {
        Restangular.all('api/facultati').getList().then(function(response) {
            $scope.facultati = response.plain();
        });
    }

    $scope.delete = function(id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/facultati', id).remove().then(loadFacultati);
        }
    };

    $scope.edit = function(facultate) {

        var modalScope = $scope.$new();
        modalScope.facultate = angular.copy(facultate);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/facultate.html',
            controller: 'AdminFacController',
            scope: modalScope
        }).result.then(loadFacultati);
    };

    $scope.add = function() {

        var modalScope = $scope.$new();
        modalScope.facultate = {};

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/facultate.html',
            controller: 'AdminFacController',
            scope: modalScope
        }).result.then(loadFacultati);
    };
});

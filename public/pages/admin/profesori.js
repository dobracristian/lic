angular.module('app').controller('ProfesoriController', function($scope, Restangular, $uibModal){
    console.log('Salut!');
    loadProfesori();

    function loadProfesori() {
        Restangular.all('api/profesori').getList().then(function(response) {
            $scope.profesori = response.plain();
        });
    }

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/profesori', id).remove().then(loadProfesori);
        }
    };

    $scope.edit = function (profesor) {

        var modalScope = $scope.$new();
        modalScope.profesor = angular.copy(profesor);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/profesor.html',
            controller: 'AdminProfesorController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadProfesori);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.profesor = { };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/profesor.html',
            controller: 'AdminProfesorController',
            scope: modalScope
        }).result.then(loadProfesori);
    };

});

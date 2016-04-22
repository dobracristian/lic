angular.module('app').controller('MateriiController', function($scope, Restangular, $uibModal){
    console.log('Salut!');
    loadMateri();

    function loadMateri() {
        Restangular.all('/api/materii').getList().then(function(response) {
            $scope.materii = response.plain();
        });
    }

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/materii', id).remove().then(loadMateri);
        }
    };

    $scope.edit = function (materie) {

        var modalScope = $scope.$new();
        modalScope.materie = angular.copy(materie);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/materie.html',
            controller: 'AdminMaterieController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadMateri);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.materie = { };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/materie.html',
            controller: 'AdminMaterieController',
            scope: modalScope
        }).result.then(loadMateri);
    };
});
angular.module('app').controller('CursuriController', function($scope, Restangular, $uibModal){
    console.log('Salut!');
    loadCursuri();

    function loadCursuri() {
        Restangular.all('api/cursuri').getList().then(function(response) {
            $scope.cursuri = response.plain();
        });
    }

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/cursuri', id).remove().then(loadCursuri);
        }
    }

    $scope.edit = function (curs) {

        var modalScope = $scope.$new();
        modalScope.curs = angular.copy(curs);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/curs.html',
            controller: 'AdminCursController',
            scope: modalScope
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        }).result.then(loadCursuri);
    }

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.curs = {
            nume: 'curs nou'
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/curs.html',
            controller: 'AdminCursController',
            scope: modalScope
        }).result.then(loadCursuri);

    }
});

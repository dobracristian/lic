angular.module('app').controller('AniController', function($scope, L, Restangular, $uibModal){
    console.log('Salut');
    loadAni();

    function loadAni() {
        L.ani($scope, 'ani');
    }

    $scope.delete = function(id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/ani', id).remove().then(loadAni);
        }
    };

    $scope.edit = function(an) {

        var modalScope = $scope.$new();
        modalScope.an = angular.copy(an);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/an.html',
            controller: 'AdminAnController',
            scope: modalScope
        }).result.then(loadAni);
    };

    $scope.add = function() {

        var modalScope = $scope.$new();
        modalScope.an = {};

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/an.html',
            controller: 'AdminAnController',
            scope: modalScope
        }).result.then(loadAni);
    };
});
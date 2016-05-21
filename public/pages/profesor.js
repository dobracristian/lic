angular.module('app').controller('ProfesorController', function ($scope, Restangular, $uibModal, L) {
    console.log('Salut');
    loadCursuri();
    loadLaboratoare();
    loadSeminarii();


    L.orarev($scope, 'orarZiOra');

    function loadCursuri() {
        Restangular.all('/api/profesor/cursuri').getList().then(function(response) {
            $scope.cursuri = response.plain();
        });
    }

    function loadLaboratoare() {
        Restangular.all('/api/profesor/laboratoare').getList().then(function(response) {
            $scope.laboratoare = response.plain();
        });
    }

    function loadSeminarii() {
        Restangular.all('/api/profesor/seminarii').getList().then(function(response) {
            $scope.seminarii = response.plain();
        });
    }

    $scope.openFilePopup = function () {

        var modalScope = $scope.$new();
        modalScope.orar = {};

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/profesor/orar.html',
            scope: modalScope
        }).result;
    };
});
angular.module('app').controller('LaboratorController', function($scope, $stateParams, Restangular, $uibModal) {
    console.log('Salut');

    Restangular.one('/api/laboratoare', $stateParams.id).get().then(function(response) {
        $scope.laborator = response.plain();
        loadFisiere();
    });

    function loadFisiere() {
        Restangular.all('/api/fisiere').getList({
            c: $scope.laborator.id_curs,
            pentru: 'lab',
            prof: $scope.laborator.id_prof
        }).then(function(response) {
            $scope.fisiere = response.plain();
        });
    }

    $scope.delete = function(id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/fisiere', id).remove().then(loadFisiere)
        }
    };

    $scope.openFilePopup = function(tip) {

        var modalScope = $scope.$new();
        modalScope.fisier = {
            nume: '',
            url: '',
            tip: tip,
            id_curs: $scope.laborator.id_curs,
            pentru: 'lab',
            id_prof: $scope.laborator.id_prof
        };
        modalScope.addFile = function (close) {
            console.log('Adaug fisierul', modalScope.fisier);
            Restangular.all('/api/fisiere').post(modalScope.fisier).then(close);
        };

        var modalInstance = $uibModal.open({
            anumation: true,
            templateUrl: 'pages/curs/fisier.html',
            scope: modalScope
        }).result.then(loadFisiere)
    };

    $scope.edit = function(fisier) {

        var modalScope = $scope.$new();
        modalScope.fisier = angular.copy(fisier);
        modalScope.save = function(close) {
            Restangular.one('/api/fisiere', modalScope.fisier.id).customPUT(modalScope.fisier).then(close);
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/curs/fisier.html',
            scope: modalScope
        }).result.then(loadFisiere);
    };

});
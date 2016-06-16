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

    $scope.openChangePassword = function(profesor) {

        var modalScope = $scope.$new();
        modalScope.info = {
            email: profesor.email,
            parola: ''
        };

        modalScope.changePassword = function() {
            console.log('C', modalScope.info.parola, profesor.id);
            Restangular.one('api/profesori', profesor.id).all('parola').post(modalScope.info).then(function(){
                console.log('Salvare incheiata');
                modalScope.$$childHead.$close();
            });

        };
        $uibModal.open({
            templateUrl: 'pages/admin/profesor-parola.html',
            scope: modalScope
        });
    };

});

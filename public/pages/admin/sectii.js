angular.module('app').controller('SectiiController', function($scope, Restangular, $stateParams, $uibModal){
    console.log("Salut!", $stateParams.f);
    $scope.filters = {
        f: Number($stateParams.f) || null
    };

    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    $scope.$watch('filters.f', loadSectii);

    function loadSectii() {
        Restangular.all('api/sectii').getList({f: $scope.filters.f}).then(function(response) {
            $scope.sectii = response.plain();
        });
    }

    $scope.delete = function (id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/sectii', id).remove().then(loadSectii);
        }
    };

    $scope.edit = function (sectie) {

        var modalScope = $scope.$new();
        modalScope.sectie = angular.copy(sectie);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/sectie.html',
            controller: 'AdminSectieController',
            scope: modalScope
        }).result.then(loadSectii);
    };

    $scope.add = function () {

        var modalScope = $scope.$new();
        modalScope.sectie = {
            id_facultate: $scope.filters.f
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/sectie.html',
            controller: 'AdminSectieController',
            scope: modalScope
        }).result.then(loadSectii);
    };
});

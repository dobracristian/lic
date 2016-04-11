angular.module('app').controller('SectiiController', function($scope, Restangular, $stateParams){
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
});

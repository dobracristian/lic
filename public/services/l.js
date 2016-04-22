angular.module('app').factory('L', function(Restangular) {

    return {
        facultati: loadFacultati,
        sectii:    loadSectii
    };
    function loadFacultati(scope, field) {

        Restangular.all('api/facultati').getList().then(function(response) {
            scope[field] = response.plain();
        });
    }

    function loadSectii(scope, field, f) {

        Restangular.all('api/sectii').getList({f: f}).then(function(response) {
            scope[field] = response.plain();
        });
    }
});
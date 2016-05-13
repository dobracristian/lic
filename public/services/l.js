angular.module('app').factory('L', function(Restangular) {

    return {
        facultati: loadFacultati,
        sectii:    loadSectii,
        serii:     loadSerii,
        grupe:     loadGrupe,
        semigrupe: loadSemigrupe

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

    function loadSerii(scope, field, sc) {

        Restangular.all('api/serii').getList({sc: sc}).then(function(response) {
            scope[field] = response.plain();
        });
    }

    function loadGrupe(scope, field, ser) {

        Restangular.all('api/grupe').getList({ser: ser}).then(function(response) {
            scope[field] = response.plain();
        });
    }

    function loadSemigrupe(scope, field, gr) {

        Restangular.all('api/semigrupe').getList({gr: gr}).then(function(response) {
            scope[field] = response.plain();
        });
    }
});
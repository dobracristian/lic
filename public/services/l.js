angular.module('app').factory('L', function(Restangular) {

    return {
        facultati: loadFacultati,
        sectii:    loadSectii,
        ani:       loadAni,
        serii:     loadSerii,
        grupe:     loadGrupe,
        semigrupe: loadSemigrupe,
        orar:      loadOrar,
        orarev:    loadOrarZiOra

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

    function loadAni(scope, field) {

        Restangular.all('api/ani').getList().then(function(response) {
            scope[field] = response.plain();
        });
    }

    function loadSerii(scope, field, sc, an) {

        Restangular.all('api/serii').getList({sc: sc, an: an}).then(function(response) {
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

    function loadOrar(scope, field, saptamana) {

        Restangular.all('api/orar').getList({sapt: saptamana}).then(function(response) {
            scope[field] = response.plain();
        });
    }

    function loadOrarZiOra(scope, field, saptamana) {

        Restangular.all('api/orar').getList({sapt: saptamana}).then(function(response) {
            var orarZiOra = {};
            angular.forEach(response.plain(), function (ora) {
                if(!orarZiOra[ora.zi+'-'+ora.ora_start]) {
                    orarZiOra[ora.zi+ '-'+ora.ora_start] =[];
                }
                orarZiOra[ora.zi+ '-'+ora.ora_start].push(ora);
            });
            scope[field] = orarZiOra;
        });
    }
});
angular.module('app').controller('OrarController', function($scope, L, Restangular, $uibModal, $stateParams) {
    console.log('Salut');
    $scope.filters ={
        curs: Number($stateParams.curs) || null,
        sem: Number($stateParams.sem) || null,
        lab: Number($stateParams.lab) || null,
        sapt: Number($stateParams.sapt) || null
    };
    $scope.saptamani = [{
        id: 1,
        nume: 'impare'
    }, {
        id: 2,
        nume: 'pare'
    }, {
        id: 3,
        nume: 'toate'
    }];
    $scope.zile = [{
        id: 1,
        nume: 'Luni'
    }, {
        id: 2,
        nume: 'Marti'
    }, {
        id: 3,
        nume: 'Miercuri'
    }, {
        id: 4,
        nume: 'Joi'
    }, {
        id: 5,
        nume: 'Vineri'
    }];
    $scope.ore = [{ora: 8},{ora: 9},{ora: 10},{ora: 11},{ora: 12},{ora: 13},{ora: 14},{ora: 15},{ora: 16},{ora: 17},
        {ora: 18},{ora: 19},{ora: 20}]

    function loadOrar() {
        L.orar($scope, 'orar', $scope.filters.sapt);
    }

    $scope.$watch('filters.sapt', loadOrar);
    $scope.$watch('filters.curs', function() {
        if($scope.filters.curs) {
            $scope.filters.sem = null;
            $scope.filters.lab = null;
        }
        else {
            loadSeminarii();
            loadLaboratoare();
        }
        loadOrar();
    });
    $scope.$watch('filters.sem', function() {
        if($scope.filters.sem) {
            $scope.filters.curs = null;
            $scope.filters.lab = null;
        }
        else {
            loadCursuri();
            loadLaboratoare();
        }
        loadOrar();
    });
    $scope.$watch('filters.lab', function() {
        if($scope.filters.lab) {
            $scope.filters.curs = null;
            $scope.filters.sem = null;
        }
        else {
            loadCursuri();
            loadSeminarii();
        }
        loadOrar();
    });

    function loadCursuri() {
        Restangular.all('api/cursuri').getList({
            sem: $scope.filters.sem,
            lab: $scope.filters.lab
        }).then(function (response) {
            $scope.cursuri = response.plain();
        });
    }

    function loadSeminarii() {
        Restangular.all('api/seminarii').getList({
            curs: $scope.filters.curs,
            lab: $scope.filters.lab
        }).then(function (response) {
            $scope.seminarii = response.plain();
        });
    }

    function loadLaboratoare() {
        Restangular.all('api/laboratoare').getList({
            curs: $scope.filters.curs,
            sem: $scope.filters.sem
        }).then(function (response) {
            $scope.laboratoare = response.plain();
        });
    }

    $scope.delete = function(id) {
        if(confirm('Sunteti sigur?')) {
            Restangular.one('api/orar', id).remove().then(loadOrar);
        }
    };

    $scope.edit = function(ora) {

        var modalScope = $scope.$new();
        modalScope.ora = angular.copy(ora);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/orarev.html',
            controller: 'AdminOrarController',
            scope: modalScope
        }).result.then(loadOrar);
    };

    $scope.add = function() {

        var modalScope = $scope.$new();
        modalScope.ora = {};

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/admin/orarev.html',
            controller: 'AdminOrarController',
            scope: modalScope
        }).result.then(loadOrar);
    };
});
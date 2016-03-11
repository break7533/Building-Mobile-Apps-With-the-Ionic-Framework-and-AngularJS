(function () {
    'use strict';

    angular.module('eliteApp').controller('locationsCtrl', ['eliteApi', locationsCtrl]);

    function locationsCtrl(eliteApi) {
        var vm = this;
        
        eliteApi.getLeagueData().then(function(data){
            vm.locations = data.locations;
        });
    };
})();
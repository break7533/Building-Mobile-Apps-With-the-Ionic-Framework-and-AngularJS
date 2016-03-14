(function () {
    'use strict';

    angular.module('eliteApp').controller('standingsCtrl', ['eliteApi', standingsCtrl]);

    function standingsCtrl(eliteApi) {
        var vm = this;
        
        eliteApi.getLeagueData().then(function(data){
            vm.standings = data.standings;
        });
    };
})();
(function () {
    'use strict';

    angular.module('eliteApp').controller('locationMapCtrl', ['eliteApi', "$stateParams", locationMapCtrl]);

    function locationMapCtrl(eliteApi, $stateParams) {
        var vm = this;

        vm.locationId = Number($stateParams.id);

        vm.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530,
            },
            zoom: 12
        };
        vm.marker= { };

        eliteApi.getLeagueData().then(function(data){

            vm.location = _.find(data.locations, {id: vm.locationId });

            vm.marker = {
                id:0,
                coords:{
                    latitude: vm.location.latitude,
                    longitude: vm.location.longitude
                },
                options:{
                    labelContent:vm.location.name + "<br/>(Tap for directions)",
                    labelAnchor: "50 90",
                    labelClass: "marker-labels"
                },
                showWindow: true
            };

            vm.map.center.latitude = vm.location.latitude;
            vm.map.center.longitude = vm.location.longitude;
        });

        vm.locationClicked = function(marker){
            window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
        };
    };
})();
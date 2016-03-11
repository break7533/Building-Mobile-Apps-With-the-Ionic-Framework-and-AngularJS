(function(){

	"use strict";

	var app = angular.module("eliteApp");

	var standingsCtrl = function(eliteApi){
		var vm = this;

		var data= eliteApi.getLeagueData();
		vm.standings = data.standings;
	};

	app.controller("standingsCtrl",["eliteApi",standingsCtrl]);
}());
(function(){

	"use strict";

	var app = angular.module("eliteApp");

	var teamsCtrl = function(eliteApi){
		var vm = this;

		eliteApi.getLeagueData().then(function(data){
			vm.teams = data.teams;
		});
		
	};

	app.controller("teamsCtrl",["eliteApi",teamsCtrl]);
}());
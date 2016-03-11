(function(){

	"use strict";

	var app = angular.module("eliteApp");

	var gameCtrl = function(eliteApi, $stateParams){
		var vm = this;

		var gameId = Number($stateParams.id);
		var data = eliteApi.getLeagueData();

		vm.game = _.find(data.games, {"id": gameId});
	};

	app.controller("gameCtrl",["eliteApi","$stateParams", gameCtrl]);
}());
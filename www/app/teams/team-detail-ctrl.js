(function () {
    'use strict';

    angular.module('eliteApp').controller('teamDetailCtrl', ['$stateParams', '$ionicPopup', 'eliteApi', 'myTeamsService', teamDetailCtrl]);

    function teamDetailCtrl($stateParams, $ionicPopup, eliteApi, myTeamsService) {
        var vm = this,
        team = null,
        leagueData = null;

        console.log("$stateParams", $stateParams);
        vm.teamId = Number($stateParams.id);

        eliteApi.getLeagueData().then(function(data){
            team = _.chain(data.teams)
            .map('divisionTeams')
            .flatten()
            .find({ "id": vm.teamId })
            .value();

            vm.teamName = team.name;

            vm.games = _.chain(data.games)
            .filter(isTeamInGame)
            .map(function (item) {
                var isTeam1 = (item.team1Id === vm.teamId ? true : false);
                var opponentName = isTeam1 ? item.team2 : item.team1;
                var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
                return {
                    gameId: item.id,
                    opponent: opponentName,
                    time: item.time,
                    location: item.location,
                    locationUrl: item.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? "vs." : "at")
                };
            })
            .value();

            vm.teamStanding = _.chain(data.standings)
            .flatten("divisionStandings")
            .find({ "teamId": vm.teamId })
            .value();

            leagueData = data.league;
        });


        //vm.following = false;
        vm.following = myTeamsService.isFollowingTeam(vm.teamId.toString());

        vm.toggleFollow = function(){

            if (vm.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        vm.following = !vm.following;
                        myTeamsService.unfollowTeam(team.id);
                    }
                });
            } else{
                vm.following = !vm.following;
                myTeamsService.followTeam({ id: team.id, name: team.name, leagueId: leagueData.id, leagueName: leagueData.name });
            }
        };


        function isTeamInGame(item){
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }

        function getScoreDisplay(isTeam1, team1Score, team2Score) {
            if (team1Score && team2Score) {
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
            else {
                return "";
            }
        }
    };
})();
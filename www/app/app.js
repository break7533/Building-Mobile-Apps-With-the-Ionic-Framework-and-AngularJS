(function () {

    var app = angular.module("eliteApp", ["ionic", "angular-cache","uiGmapgoogle-maps"]);

    app.config(function($ionicConfigProvider) {

        $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
        $ionicConfigProvider.tabs.position('bottom');
    });

    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state("home", {
            abstract: true,
            url: "/home",
            templateUrl: "app/home/home.html"
        })

        .state("home.leagues", {
            url: "/leagues",
            views: {
                "tab-leagues": {
                    templateUrl: "app/home/leagues.html"
                }
            }
        })


        .state("home.myteams", {
            url: "/myteams",
            views: {
                "tab-myteams": {
                    templateUrl: "app/home/myteams.html"
                }
            }
        })

        .state("app", {
            abstract: true,
            url:"/app",
            templateUrl: "app/layout/menu-layout.html"
        })

        .state("app.teams", {
            url: "/teams",
            views: {
                "mainContent" : {
                    templateUrl: "app/teams/teams.html"
                }
            }
        })

        .state("app.team-detail", {
            url: "/teams/:id",
            views: {
                "mainContent" : {
                    templateUrl: "app/teams/team-detail.html"
                }
            }
        })

        .state("app.game", {
            url: "/game/:id",
            views: {
                "mainContent" : {
                    templateUrl: "app/game/game.html"
                }
            }
        })

        .state("app.standings", {
            url: "/standings",
            views: {
                "mainContent" : {
                    templateUrl: "app/standings/standings.html"
                }
            }
        })

        .state("app.locations", {
            url: "/locations",
            views: {
                "mainContent" : {
                    templateUrl: "app/locations/locations.html"
                }
            }
        })

        .state("app.location-map", {
            url:"/location-map/:id",
            views:{
                "mainContent": {
                    templateUrl:"app/locations/location-map.html"
                }
            }
        })

        .state("app.rules", {
            url: "/rules",
            views: {
                "mainContent" : {
                    templateUrl: "app/rules/rules.html"
                }
            }
        })

        ;

        //if not of te above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/home/leagues");

    });

    app.run(function ($ionicPlatform,CacheFactory) {
        CacheFactory("leagueDataCache",{storageMode:"localStorage",maxAge:720000, deleteOnExpire:"aggressive"});
        CacheFactory("leaguesCache",{storageMode:"localStorage",maxAge:720000, deleteOnExpire: "aggressive"});
        CacheFactory("myTeamsCache",{storageMode:"localStorage"});
        CacheFactory("staticCache",{storageMode:"localStorage"});


        $ionicPlatform.ready(function(){
            //Hide the accessory bar by default (remove this to show the acessory bar above for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            };

            if(window.Statusbar){
                //org.apache.cordova.statusbar required
                Statusbar.styleDefault();
            };
            
        });

    });

}());

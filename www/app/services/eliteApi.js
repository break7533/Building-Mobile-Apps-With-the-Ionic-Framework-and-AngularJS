(function() {
    'use strict';

    angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'CacheFactory', eliteApi]);

    function eliteApi($http, $q, $ionicLoading, CacheFactory) {


        self.leaguesCache = CacheFactory.get("leaguesCache");
        self.leagueDataCache = CacheFactory.get("leagueDataCache");


        self.leaguesCache.setOptions({
            onExpire: function (key, value) {
                getLeagues()
                    .then(function () {
                        
                    }, function () {
                        
                        self.leaguesCache.put(key, value);
                    });
            }
        });

        self.leagueDataCache.setOptions({
            onExpire: function (key, value) {
                getLeagueData()
                    .then(function () {
                        
                    }, function () {
                        
                        self.leagueDataCache.put(key, value);
                    });
            }
        });

        self.staticCache = CacheFactory.get("staticCache");

        function setLeagueId(leagueId){
            self.staticCache.put("currentLeagueId", leagueId);
            getLeagueData();
        }

        function getLeagueId(){
            var id = self.staticCache.get("currentLeagueId");
            console.log("in get leagueid", id);
            return id;
        }

        function getLeagues() {
            var deferred = $q.defer(),
                cacheKey = "leagues",
                leaguesData = self.leaguesCache.get(cacheKey);

            if (leaguesData) {
                
                deferred.resolve(leaguesData);
            } else {
                $http.get("http://elite-schedule.net/api/leaguedata")
                    .success(function(data) {
                        
                        self.leaguesCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function() {
                        
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }

        function getLeagueData(forceRefresh) {
            if (typeof forceRefresh === "undefined") { forceRefresh = false; }

            var deferred = $q.defer(),
                cacheKey = "leagueData-" + getLeagueId(),
                leagueData = null;

            if (!forceRefresh) {
                leagueData = self.leagueDataCache.get(cacheKey);
            };
            
            if (leagueData) {
                
                deferred.resolve(leagueData);
            } else {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
                    .success(function(data, status) {
                        
                        self.leagueDataCache.put(cacheKey, data);
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function(response) {
                        
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }
            return deferred.promise;
        };

       

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData,
            setLeagueId: setLeagueId
        };
    };
})();
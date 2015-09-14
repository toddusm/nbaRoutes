var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	this.addNewGame = function(gameObj){
		var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}
		return $http({
			method: 'POST',
			url: url,
			data: gameObj
		})
	}
	
	this.getTeamData = function(team){
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team + '/?order=-createdAt';
		$http({
			method: 'GET',
			url: url
		}).then(function(data){
			var results = data.data.results;
			console.log(1111, results);
			var wins = 0;
			var losses = 0;
			results.wins = wins;
			results.losses = losses;
			for(var i = 0; i < results.length; i++){
				if(results[i].won){
						wins++
				} else {
					losses++
				}
			}
			deferred.resolve(results);
		})
		return deferred.promise;
	}
});
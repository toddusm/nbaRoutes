var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;
	$scope.newGame = {
	};
	$scope.showNewGameForm = false;
	$scope.toggleNewGameForm = function(){
		$scope.showNewGameForm = !$scope.ShowNewGameForm;
	}
	console.log($routeParams);
	if($routeParams.team === 'utahjazz'){
		$scope.homeTeam = 'Utah Jazz'
		$scope.logoPath = 'images/jazz-logo.png'
	} else if($routeParams.team === 'losangeleslakers'){
		$scope.homeTeam = 'Los Angeles Lakers';
		$scope.logoPath = 'images/lakers-logo.png';
	}else if($routeParams.team === 'miamiheat'){
		$scope.homeTeam = 'Miami Heat';
		$scope.logoPath = 'images/heat-logo.png';
	}
	$scope.submitGame = function(){
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
		$scope.newGame.opponent = $scope.newGame.opponent
		$scope.newGame.homeTeamScore = $scope.homeTeamScore;
		$scope.newGame.opponentScore = $scope.opponentScore;
		teamService.addNewGame($scope.newGame).then(function(){
			teamService.getTeamData($scope.newGame.homeTeam).then(function(results){
				$scope.teamData = results;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			})
		})
	}
});
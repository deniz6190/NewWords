var myApp = angular.module('myApp', []) //links js and html together

myApp.service('HistoryService', function($http){
	var BaseUrl= "http://localhost:8080/"

	this.saveWord = function(newWord) {
		var url = BaseUrl +"saveCurrent"
		return $http.post(url, {word: newWord})
	}//this function is a service which retrieves the value from the HTML file and sends to tehe server

	this.getSaved = function(newWord) {
			var url = BaseUrl +"getSaved"
			return $http.get(url)
	}

})// creates a memory service to recall previously submitted words. $http because interfaces with the internet not with the host

myApp.controller('MyController', function ($scope, HistoryService) {
	$scope.newWord ='cat'
	$scope.word= []
	$scope.saveThisWord= function(){
		HistoryService.saveWord( $scope.newWord )//returns a 'promise'; a future value to be filled
		.then(saveSuccess, error)
	}//hooks up the button to the index.html meaning it takes the input properly.

	$scope.function getSavedWords(){
		HistoryService.getsaved()
		.then(loadSuccess, error)
	}

	function saveSuccess(json){
		console.log(json)
	}

	function error(json){
		console.log(err)
	}

	function loadSuccess(json){
		$scope.words=json.data
	}
}) //scope defines the array of data the html file has access to

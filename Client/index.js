var myApp = angular.module('myApp', []) //links js and html together

myApp.service('GifService', function ($http) {
	var baseUrl= "https://api.giphy.com/v1/gifs/"
	var apiKey = "dc6zaTOxFJmzC"

	this.getGifs=function(query) {
		var url= baseUrl + "search?q=" + query + "&api_key=" + apiKey
		return $http.get(url)

	}

})

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

myApp.controller('MyController', function ($scope, HistoryService, GifService) {
	$scope.newWord ='cat'
	$scope.word= []
	$scope.gifUrl = ''
	$scope.saveThisWord= function(){
		HistoryService.saveWord( $scope.newWord )//returns a 'promise'; a future value to be filled
		.then(saveSuccess, error)
	}//hooks up the button to the index.html meaning it takes the input properly.

	$scope.getSavedWords = function(){
		HistoryService.getSaved()
		.then(loadSuccess, error)
	}

	$scope.showGifs = function($event) {
		GifService.getGifs ($event.currentTarget.innerHTML)
		.then(gifSuccess, error)
	}

	function gifSuccess(json){
		if (json.data.data[0]){
			$scope.gifUrl = json.data.data[0].images.fixed_height.url
		} else {
			$scope.gifUrl= "http://goo.gl/tioFyj"
		}
		
	}

	function saveSuccess(json){
		console.log(json)
	}

	function loadSuccess(json){
		$scope.words=json.data
	}

		function error(json){
		console.log(err)
	}
}) //scope defines the array of data the html file has access to

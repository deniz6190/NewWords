var myApp= angular.module('myApp',[]) //links js and html together

myApp.controller('MyContoller', function ($scope) {
	$scope.newWord ='cat'
}) //scope defines the array of data the html file has access to
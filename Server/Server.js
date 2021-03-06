var express = require('express')
var app = express()
var bodyParser = require('body-Parser')
var Nedb =require('nedb')

var database = new Nedb({filename: '.data/data.db' , autoload: true})

app.use(express.static('../Client'))

app.use(bodyParser.json())

app.post('/saveCurrent', function (req, res) {
	var data = {
		word: req.body.word, 
		date: Date.now()}

	var done= function () {
	console.log("Got a request to save something!")
	res.end("done")	
	}

database.insert(data, done)	
}) //req=info set by web app from client, res=response, i.e. what is sent back use res.send to send something in response

app.get('/getSaved', function (req,res) {

	//query
	var query = {} //because empty braces grabs everything because searches everything

	var done= function(err, data) {
		console.log("data read from database")
		res.send(data)
	}
	
	database.find(query, done)
})

app.listen(8080)
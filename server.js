var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/company');

var Schema = mongoose.Schema;

var InfoSchema = new Schema({
	timestamp: String,
	Destination_ip: String,
	Destination_vn: String,
    Direction:String,
	Destination_port:String,
	protocol:String,
	source_ip:String,
	source_vn:String,
	source_port:String,
	sum_bytes:String,
	sum_packets:String
});

mongoose.model('Info', InfoSchema);

var info = mongoose.model('Info');



var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ROUTES

app.get('/api/infos', function(req, res) {
	info.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log("Received a GET request for _id: " + item._id);
		})
		res.send(docs);
	});
});

app.post('/api/infos', function(req, res) {
	console.log('Received a POST request:')
	for (var key in req.body) {
		console.log(key + ': ' + req.body[key]);
	}
	var info = new Info(req.body);
	info.save(function(err, doc) {
		res.send(doc);
	});
});

app.delete('/api/infos/:id', function(req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	info.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
});

app.put('/api/infos/:id', function(req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	info.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
	});
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);

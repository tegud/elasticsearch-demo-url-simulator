var dgram = require('dgram');
var moment = require('moment');
var fs = require('fs');

var utilities = require('./lib/utilities');
var urls = require('./lib/urls');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));
var userAgents = fs.readFileSync(__dirname + '/useragents.csv', 'utf-8').split(' \r\n');
var ips = fs.readFileSync(__dirname + '/ips.csv', 'utf-8').split(' \r\n');

console.log(`Sending simulated urls to ${config.host}:${config.port}`)

var socket = dgram.createSocket('udp4');

function logRequest() {
	var ip = ips[utilities.randomNumber(0, ips.length - 1)];
	var userAgent = userAgents[utilities.randomNumber(0, userAgents.length - 1)];

	var logstash = {
 		'@timestamp': moment().toISOString(),
		type: 'my_web_server_logs',
		ip: ip,
		useragent: userAgent,
		time_to_first_byte: utilities.randomNumber(15, 400),
		url: urls.random()
 	};

 	console.log(logstash);

	var message = new Buffer(JSON.stringify(logstash));

	socket.send(message, 0, message.length, config.port, config.host, function(err, bytes) {
		if(err) {
			console.log(err);
		}
	});

	setTimeout(logRequest, utilities.randomNumber(10, 1000))
}
logRequest();

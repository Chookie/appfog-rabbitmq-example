// From https://blog.appfog.com/tutorial-rabbitmq-node-js-on-appfog/

var express = require('express'),
    //path = require('path'),
    //amqp = require('amqp'),
    bodyParser = require('body-parser'),
    stylus = require('stylus');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//noinspection JSUnusedGlobalSymbols
app.use(stylus.middleware (
    {
        src: __dirname + '/public',
        compile: function(str, path){
            return stylus(str).set('filename', path);
        }
    }
));
app.use(express.static(__dirname + '/public'));

app.connectionStatus = 'No server connection';
app.exchangeStatus = 'No exchange established';
app.queueStatus = 'No queue established';

app.get('*', function (req, res) {
   res.render('index',
       {
           title: "Welcome to RabbitMQ and Node/Express",
           connectionStatus: app.connectionStatus,
           exchangeStatus: app.exchangeStatus,
           queueStatus: app.queueStatus
       });
});

app.listen(app.get('port'), function () {
   console.log("RabbitMQ + Node.js app running on port %s", app.get('port'))
});


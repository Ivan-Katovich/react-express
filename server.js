var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/ind.html');
});

app.get('/table',function(req,res){
    res.sendFile(__dirname+'/example.html');
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
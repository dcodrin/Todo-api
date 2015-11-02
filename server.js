/**
 * Created by Codrin on 2015-11-02.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
   res.send('Todo API root');
});

app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT + '!');
});





/**
 * Created by Codrin on 2015-11-02.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send('Todo API root');
});

//GET /todos
app.get('/todos', function (req, res) {
   //res.send(todos); This will not work since we can only send JSON;
   //We need to use .json
    res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
   var id = Number(req.params.id); //We used Number() here because req.params return a string. We could have also set our id to string and leave the req.params as is.
    var found;
    todos.forEach(function (todo) {
        if(todo.id === id){
            found = todo;
        }
    });
    if(found){
        res.json(found);
    } else {
        res.status(404).send();
    }
});

//POST /todos
app.post('/todos', function (req, res) {
    var body = req.body;
    body.id = todoNextId;
    todoNextId++;
    todos.push(body);
    res.json(body);
});

app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT + '!');
});





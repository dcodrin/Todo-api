/**
 * Created by Codrin on 2015-11-02.
 */
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
    var found = _.findWhere(todos, {id: id});

    if(found){
        res.json(found);
    } else {
        res.status(404).send();
    }
});

//POST /todos
app.post('/todos', function (req, res) {
    //We are filtering out any other data except for "description" and "completed"
    var body = _.pick(req.body, 'description', 'completed');
    //More filtering
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    //Getting rid of unnecessary spaces
    body.description = body.description.trim();

    body.id = todoNextId;
    todoNextId++;
    todos.push(body);
    res.json(body);
});

//DELETE /todos/:id

app.delete('/todos/:id', function (req, res) {
    var id = Number(req.params.id);
    var found = _.findWhere(todos, {id: id});
    todos = _.without(todos,found);
    if(!found){
        res.status(404).json({"error": "no todo found with that id"});
    } else {
        res.json(found);
    }
});

// PUT /todos/:id

app.put('/todos/:id', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    var id = Number(req.params.id);
    var found = _.findWhere(todos, {id: id});

    if(!found){
        return res.status(404).send();
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed
    } else if(body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if(body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    //Using underscore to replace the key-value pairs of found with validAttributes
    _.extend(found, validAttributes);

    res.json(found);

});


app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT + '!');
});





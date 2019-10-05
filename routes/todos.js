var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://vaari:vaari6029@ds229088.mlab.com:29088/todo_mean',['todos'] );
///Get all Todos 
router.get('/todos',function(req,res,next)
{
   db.todos.find(function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else
    {
        res.json(todos);
    }
   })
})

///Get only single Todo
router.get('/todo/:id',function(req,res,next){

    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)

    },function(err, todo){

        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(todo);
        }

    })

})


/// Post a todo or Save a todo in DB
router.post('/todo',function(req,res,next){
    var todo = req.body; // come from form

    if(!todo.text || !(todo.completed + '')){
        res.status(400);
        res.json({
            "error" : "Invalid Todo"
        });
    }
    else
    {
        db.save(todo,function(err,result){
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.json (result);
            }
        })
    }

})


/// Update a Todo 

router.put('/todo/:id',function(req,res,next){
    var todo = req.body;
    var updObj = {};
    if(todo.completed)
    {
        updObj.completed = todo.completed;
    }
    if(todo.text)
    {
        updObj.text = todo.text;
    }
    if(!updObj)
    {
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    }
    else
    {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)

        },updObj, {},function(err, result){
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.json(result);
            }

        })
    }


})


//// Delete a todo

router.delete('/todo/:id',function(req,res,next){

    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '',function(err, result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(result);
        }
    })

})
module.exports = router;

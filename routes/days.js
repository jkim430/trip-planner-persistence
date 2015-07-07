var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day.find({}).populate('hotel restaurants thingsToDo').exec()
    .then(function(data) {
        res.json(data);
    })
    // res.json({});
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    models.Day.create({number:req.body.number})
    .then(function(day) {
        res.json(day);
    });
});


dayRouter.post('/:id', function (req, res, next) {
    models.Day.update({number:req.params.id},
        {number:req.body.id},function(err,day){
        res.end();
    })
});

// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    models.Day.find({number:req.params.id})
            .exec()
            .then(function(day){
                res.json(day);
            })
    res.locals.dayNumber = req.params.id;
    next();
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    models.Day.find({number:req.params.id})
        .remove()
        .exec()
        .then(function(data){
            res.json(data);
        })
});

dayRouter.param('id',function(req,res,next,id){
    req.id = id;
    next();
})
dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel

attractionRouter.post('/hotel', function (req, res, next) {
    models.Day.update({number:req.id},
        {hotel:req.body.id},function(err,day){
        res.end();
    })
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    models.Day.update({number:req.id},{$unset:{hotel:1}},function(err,data){
        res.end();
    })

});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
    // models.Restaurant.findOne({name: req.body.restaurant})
    //     .exec()
    //     .then(function(restaurant) {
            models.Day.update({number:req.id}, {$push: {restaurants: req.body.id}}, function(err, data) {
                res.end();
            })
        // })

});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurants/:id', function (req, res, next) {
    // deletes a reference to a restaurant
    models.Day.update({number:req.id}, {$pull: {restaurants: req.params.id}}, function(err,data) {
        res.end();
    })
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
    // models.ThingToDo.findOne({name: req.body.thingToDo})
    //     .exec()
    //     .then(function(thing) {
            models.Day.update({number:req.id}, {$push: {thingsToDo: req.body.id}}, function(err, data) {
                res.end();
            })
        // })
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
    models.Day.update({number:req.id}, {$pull: {thingsToDo: req.params.id}}, function(err,data) {
        res.end();
    })
});

module.exports = dayRouter;



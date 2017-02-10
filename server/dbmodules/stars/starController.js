var Star = require('./starModel.js');
var Q = require('q');

var createStar = Q.nbind(Star.create, Star);
var findStars = Q.nbind(Star.find, Star);
var populateStars = Q.nbind(Star.populate, Star);

module.exports = {

  newStar : function(req, res, next) {
    return createStar(req.body).then(function(star) {
      if (star) {
        res.json(star);
      } 
      next();
    }).fail(function(err){
      next(err);
    });
  },

  getStars : function(req, res, next) {
    Star
    .find(req.body)
    .populate('_userId')
    .exec(function (err, stars) {
      if (err) return handleError(err);
      console.log('STARS', stars);
      if(stars) {
        res.json(stars);
      }
      next();
    });
  },  

  getStars2 : function(req, res, next) {
    return findStars({_userId: '589cf9b32b67e89c849864c4'}).then(function(stars){
      return populateStars({path: '_userId'});
    })
    .then(function(stars) {
      if(stars) {
        res.json(stars);
      }
      next();
    })
    .fail(function(err){
      next(err);
    });
  },

};
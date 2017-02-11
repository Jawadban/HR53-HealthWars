var Star = require('./starModel.js');
var Q = require('q');
var Promises = require('bluebird');

var createStar = Q.nbind(Star.create, Star);
var findStars = Q.nbind(Star.find, Star);
var populateStars = Q.nbind(Star.populate, Star);
var findUserStars = Q.nbind(Star.find, Star);


var mysql = require('promise-mysql');
var connection;
 
module.exports = {






  getStarsMYSQL : function(req, res) {

    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
     
        return connection.query('select u.name, u.username, t.name as team from users u inner join teams t on u.id_teams = t.id');
    }).then(function(rows){
        // Logs out a list of hobbits 
        console.log(rows);
        res.json(rows);
        
    });


  },

};

// module.exports = {

//   getStarsMYSQL : function(req, res, next) {

//   },

//   newStar : function(req, res, next) {
//     return createStar(req.body).then(function(star) {
//       if (star) {
//         res.json(star);
//       } 
//       next();
//     }).fail(function(err){
//       next(err);
//     });
//   },

//   getStars : function(req, res, next) {
//     Star
//     .find(req.body)
//     .populate('_userId')
//     .exec(function (err, stars) {
//       if (err) return handleError(err);
//       console.log('STARS', stars);
//       if(stars) {
//         res.json(stars);
//       }
//       next();
//     });
//   },
//   getStarsCount : function(req, res, next) {
//     Star
//     .aggregate([
//         {
//             $group: {
//                 _id: '$_userId',  //$region is the column name in collection
//                 count: {$sum: 1}
//             }
//         },
        
//     ])
//     .exec(function (err, stars) {
//       if (err) return handleError(err);
//       console.log('STARS', stars);
//       if(stars) {
//         res.json(stars);
//       }
//       next();
      
//     });
//   },

//   getUserStars : function(req, res, next) {
//     return findUserStars({_userId: req.params.user_id}).then(function(stars){
//       if(stars) {
//         res.json(stars);
//       }
//       next();
//     }).fail(function(err){
//       next(err);
//     });
//   },  

//   getStars2 : function(req, res, next) {
//     return findStars({_userId: '589cf9b32b67e89c849864c4'}).then(function(stars){
//       return populateStars({path: '_userId'});
//     })
//     .then(function(stars) {
//       if(stars) {
//         res.json(stars);
//       }
//       next();
//     })
//     .fail(function(err){
//       next(err);
//     });
//   },

// };
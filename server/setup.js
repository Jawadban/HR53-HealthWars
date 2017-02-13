
var mysql = require('mysql');
var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'healthwars'
});

 
connection.connect();

var sql = [
    
    "set foreign_key_checks=0;",

    // users
    "DROP TABLE IF EXISTS `users`;",
    "CREATE TABLE `users` ( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(100) DEFAULT NULL, `username` varchar(100) DEFAULT NULL, `id_teams` int(11) DEFAULT NULL, `facebook_id` varchar(255) DEFAULT NULL, `facebook_token` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`), KEY `id_teams` (`id_teams`), CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_teams`) REFERENCES `teams` (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;",

    // stars
    "DROP TABLE IF EXISTS `stars`; CREATE TABLE `stars` ( `id` int(11) NOT NULL AUTO_INCREMENT, `color` varchar(100) DEFAULT NULL, `id_users` int(11) DEFAULT NULL, `id_competition` int(11) DEFAULT NULL, PRIMARY KEY (`id`), KEY `id_users` (`id_users`), KEY `id_competition` (`id_competition`), CONSTRAINT `stars_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`), CONSTRAINT `stars_ibfk_2` FOREIGN KEY (`id_competition`) REFERENCES `competition` (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8; ",

    // competition
    "DROP TABLE IF EXISTS `competition`; CREATE TABLE `competition` ( `id` INTEGER AUTO_INCREMENT, `name` VARCHAR(255) NULL DEFAULT NULL, `id_exercises` INTEGER NULL DEFAULT NULL, `start` DATETIME NULL DEFAULT NULL, `end` DATETIME NULL DEFAULT NULL, PRIMARY KEY (`id`) );",

    // users_achievements
    "DROP TABLE IF EXISTS `users_achievements`; CREATE TABLE `users_achievements` ( `id` INTEGER AUTO_INCREMENT, `id_users` INTEGER NULL DEFAULT NULL, `id_achievements` INTEGER NULL DEFAULT NULL, PRIMARY KEY (`id`) );",

    // teams
    "DROP TABLE IF EXISTS `teams`; CREATE TABLE `teams` ( `id` INTEGER AUTO_INCREMENT, `name` VARCHAR(255) NULL DEFAULT NULL, PRIMARY KEY (`id`) );",

    // achievements
    "DROP TABLE IF EXISTS `achievements`; CREATE TABLE `achievements` ( `id` INTEGER AUTO_INCREMENT, `name` VARCHAR(255) DEFAULT NULL, PRIMARY KEY (`id`) );",

    // exercises
    "DROP TABLE IF EXISTS `exercises`; CREATE TABLE `exercises` ( `id` INTEGER AUTO_INCREMENT, `name` VARCHAR(255) NULL DEFAULT NULL, `unit` VARCHAR(255) NULL DEFAULT NULL, `description` VARCHAR(255) NULL DEFAULT NULL, PRIMARY KEY (`id`) );",

    // Foreign Keys
    "ALTER TABLE `users` ADD FOREIGN KEY (id_teams) REFERENCES `teams` (`id`);",
    "ALTER TABLE `stars` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);",
    "ALTER TABLE `stars` ADD FOREIGN KEY (id_competition) REFERENCES `competition` (`id`);",
    "ALTER TABLE `competition` ADD FOREIGN KEY (id_exercises) REFERENCES `exercises` (`id`);",
    "ALTER TABLE `users_achievements` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);",
    "ALTER TABLE `users_achievements` ADD FOREIGN KEY (id_achievements) REFERENCES `achievements` (`id`);",

    // add data - users
    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Aaron', 'Aaron', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Ahmed', 'Ahmed', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Ai', 'Ai', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Albert', 'Albert', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Alison', 'Alison', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Andi', 'Andi', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Anukul', 'Anukul', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Brenner', 'Brenner', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Brian', 'Brian', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Cy', 'Cy', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Daniel', 'Daniel', 3, null, null);",


    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Dan', 'Dan', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Dave', 'Dave', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Derek', 'Derek', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'DJ', 'DJ', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Franklin', 'Franklin', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Greg', 'Greg', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Hanyen', 'Hanyen', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Jackie', 'Jackie', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'James', 'James', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Jared', 'Jared', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'John', 'John', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Jon', 'Jon', 3, null, null);",


    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Justin', 'Justin', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Kay', 'Kay', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Marcus', 'Marcus', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Pat', 'Pat', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Peter', 'Peter', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Savy', 'Savy', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Simon', 'Simon', 2, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Smriti', 'Smriti', 3, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Mark', 'Mark', 4, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Tenzin', 'Tenzin', 1, null, null);",

    "INSERT INTO `users` (`id`, `name`, `username`, `id_teams`, `facebook_id`, `facebook_token`) VALUES (null, 'Will', 'Will', 2, null, null);",




    // add data - teams
    "INSERT INTO `teams` (`name`) VALUES ('HR-52');",
    "INSERT INTO `teams` (`name`) VALUES ('HR-53');",
    "INSERT INTO `teams` (`name`) VALUES ('HR-72');",
    "INSERT INTO `teams` (`name`) VALUES ('HR-73');",  

    // add data - exercises
    "INSERT INTO `exercises` (`name`, `unit`, `description`) VALUES ('Stairs', 'Once up and down, round-trip', 'All 8 flights of stairs, each way.');",
    "INSERT INTO `exercises` (`name`, `unit`, `description`) VALUES ('Push-ups', '10', 'Plank position, hands a little wider than shoulder width.  On knees OK.');",
    "INSERT INTO `exercises` (`name`, `unit`, `description`) VALUES ('Pull-ups', '5', 'Hands wider than shoulders, chin to bar.');",
    "INSERT INTO `exercises` (`name`, `unit`, `description`) VALUES ('Planks', '1-minute', 'On forearms, straight back & butt, on balls of feet.');",
    "INSERT INTO `exercises` (`name`, `unit`, `description`) VALUES ('Jumping Jacks', '20', 'Arms to at least 45 degrees upwards');",

    //add data - competition
    "INSERT INTO `competition` (`name`, `id_exercises`, `start`, `end`) VALUES ('Week 1', '1', '2017-02-06', '2017-02-11');",

    "INSERT INTO `competition` (`name`, `id_exercises`, `start`, `end`) VALUES ('Week 2', '2', '2017-02-13', '2017-02-18');",

];

var colors = [
    'red', 'blue', 'green', 'orange', 'bronze', 'purple', 'pink', 'silver', 'gold'
];

var starsSQL = '';
// generate stars
for (var i = 1; i < 35; i++) {
    var random = Math.floor((Math.random() * 10) + 1);
        var randomColor = Math.floor((Math.random() * colors.length));
    for (var j = 0; j < random; j++) {
        starsSQL += "INSERT INTO `stars` (`id`, `color`, `id_users`, `id_competition`) VALUES (null, '" + colors[randomColor] + "', " + i + ", 1);";

    }

    var random2 = Math.floor((Math.random() * 10) + 1);
        var randomColor = Math.floor((Math.random() * colors.length));
    for (var j = 0; j < random2; j++) {
        starsSQL += "INSERT INTO `stars` (`id`, `color`, `id_users`, `id_competition`) VALUES (null, '" + colors[randomColor] + "', " + i + ", 2);";

    }
}


var insert = '';
for (var i = 0; i < sql.length; i++) {
    insert += sql[i];
}

insert += starsSQL;

connection.query(insert, function (error, results, fields) {
  if (error) throw error;
  // `results` is an array with one element for every statement in the query: 
  console.log('SCHEMA CREATED!'); // [{1: 1}] 
  
});
// var execsql = require('execsql'),
//     dbConfig = {
//         host: 'localhost',
//         user: 'root',
//         password: ''
//     },
//     sql = 'use healthwars2;',
//     sqlFile = __dirname + '/healthwars.sql';
// execsql.config(dbConfig)
//     .exec(sql)
//     .execFile(sqlFile, function(err, results){
//         if (err) {
//             console.log('DATABASE SETUP ERR', err);
//         } else {
//             console.log('DATABASE SETUP', results);
//         }
//     });

var mysql = require('mysql');
var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'healthwars2'
});

 
connection.connect();

var sql = [
    
    "set foreign_key_checks=0;",

    // users
    "DROP TABLE IF EXISTS `users`;",
    "CREATE TABLE `users` (`id` INTEGER AUTO_INCREMENT,`name` VARCHAR(100) NULL DEFAULT NULL,`username` VARCHAR(100) NULL DEFAULT NULL,`id_teams` INTEGER NULL DEFAULT NULL, PRIMARY KEY (`id`));",

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
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (2,'Bill Lea','billylea',2);",
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (3,'Max Quinn','maxquinn',2);",
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (4,'Abiy Melaku','abiymelaku',2);",
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (5,'Bill Lea','billylea',2);",
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (6,'Max Quinn','maxquinn',2);",
    "INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES (7,'Abiy Melaku','abiymelaku',2);",

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
    "INSERT INTO `competition` (`name`, `id_exercises`, `start`, `end`) VALUES ('Week 1', '1', '2017-02-14', '2017-02-21');",



];

var insert = '';
for (var i = 0; i < sql.length; i++) {
    insert += sql[i];
}


connection.query(insert, function (error, results, fields) {
  if (error) throw error;
  // `results` is an array with one element for every statement in the query: 
  console.log('SCHEMA CREATED!'); // [{1: 1}] 
  
});
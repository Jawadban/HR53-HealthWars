-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `id_teams` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'stars'
-- 
-- ---

DROP TABLE IF EXISTS `stars`;
    
CREATE TABLE `stars` (
  `id` INTEGER AUTO_INCREMENT,
  `color` VARCHAR(100) NULL DEFAULT NULL,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_competition` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'competition'
-- 
-- ---

DROP TABLE IF EXISTS `competition`;
    
CREATE TABLE `competition` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `id_exercises` INTEGER NULL DEFAULT NULL,
  `start` DATETIME NULL DEFAULT NULL,
  `end` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_achievements'
-- 
-- ---

DROP TABLE IF EXISTS `users_achievements`;
    
CREATE TABLE `users_achievements` (
  `id` INTEGER AUTO_INCREMENT,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_achievements` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'teams'
-- 
-- ---

DROP TABLE IF EXISTS `teams`;
    
CREATE TABLE `teams` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'achievements'
-- 
-- ---

DROP TABLE IF EXISTS `achievements`;
    
CREATE TABLE `achievements` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'exercises'
-- 
-- ---

DROP TABLE IF EXISTS `exercises`;
    
CREATE TABLE `exercises` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `unit` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `users` ADD FOREIGN KEY (id_teams) REFERENCES `teams` (`id`);
ALTER TABLE `stars` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `stars` ADD FOREIGN KEY (id_competition) REFERENCES `competition` (`id`);
ALTER TABLE `competition` ADD FOREIGN KEY (id_exercises) REFERENCES `exercises` (`id`);
ALTER TABLE `users_achievements` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `users_achievements` ADD FOREIGN KEY (id_achievements) REFERENCES `achievements` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `stars` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `competition` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_achievements` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `teams` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `achievements` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `exercises` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`name`,`username`,`id_teams`) VALUES
-- ('','','','');
-- INSERT INTO `stars` (`id`,`color`,`id_users`,`id_competition`) VALUES
-- ('','','','');
-- INSERT INTO `competition` (`id`,`name`,`id_exercises`,`start`,`end`) VALUES
-- ('','','','','');
-- INSERT INTO `users_achievements` (`id`,`id_users`,`id_achievements`) VALUES
-- ('','','');
-- INSERT INTO `teams` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `achievements` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `exercises` (`id`,`name`,`unit`,`description`) VALUES
-- ('','','','');


INSERT INTO `healthwars`.`teams` (`name`) VALUES ('HR-52');
INSERT INTO `healthwars`.`teams` (`name`) VALUES ('HR-53');
INSERT INTO `healthwars`.`teams` (`name`) VALUES ('HR-72');
INSERT INTO `healthwars`.`teams` (`name`) VALUES ('HR-73');

INSERT INTO `healthwars`.`users` (`name`, `username`, `id_teams`) VALUES ('Bill Lea', 'billylea', '2');
INSERT INTO `healthwars`.`users` (`name`, `username`, `id_teams`) VALUES ('Max Quinn', 'maxquinn', '2');
INSERT INTO `healthwars`.`users` (`name`, `username`, `id_teams`) VALUES ('Abiy Melaku', 'abiymelaku', '2');


INSERT INTO `healthwars`.`exercises` (`name`, `unit`, `description`) VALUES ('Stairs', 'Once up and down, round-trip', 'All 8 flights of stairs, each way.');
INSERT INTO `healthwars`.`exercises` (`name`, `unit`, `description`) VALUES ('Push-ups', '10', 'Plank position, hands a little wider than shoulder width.  On knees OK.');
INSERT INTO `healthwars`.`exercises` (`name`, `unit`, `description`) VALUES ('Pull-ups', '5', 'Hands wider than shoulders, chin to bar.');
INSERT INTO `healthwars`.`exercises` (`name`, `unit`, `description`) VALUES ('Planks', '1-minute', 'On forearms, straight back & butt, on balls of feet.');
INSERT INTO `healthwars`.`exercises` (`name`, `unit`, `description`) VALUES ('Jumping Jacks', '20', 'Arms to at least 45 degrees upwards');


INSERT INTO `healthwars`.`competition` (`name`, `id_exercises`, `start`, `end`) VALUES ('Week 1', '1', '2017-02-14', '2017-02-21');

PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE comments (
  id integer PRIMARY KEY AUTOINCREMENT,
  author text NOT NULL,
  body text NOT NULL,
  post_slug text NOT NULL
);
INSERT INTO comments VALUES(1,'Kristian','Great post!','hello-world');
INSERT INTO comments VALUES(2,'John','I agree!','hello-world');
INSERT INTO comments VALUES(3,'Bob',replace('I like it\n','\n',char(10)),'hello-world');
INSERT INTO comments VALUES(6,'Test User','Test Comment','hello-world');
INSERT INTO comments VALUES(8,'Bob','I like IT!','hello-world');
INSERT INTO comments VALUES(10,'qwqweqwe','qweqe qeqwe qweq qe','hello-world');
INSERT INTO comments VALUES(11,'Mauro ','qd  fweqffwq wee','hello-world');
INSERT INTO comments VALUES(12,'Mauro','Test build and other things','hello-world');
INSERT INTO comments VALUES(13,'Now ','Last comment check','hello-world');
INSERT INTO comments VALUES(14,'Yalc','This is the last!!😁😁','hello-world');
INSERT INTO comments VALUES(15,'John Doe','Hello world!','hello-world');
INSERT INTO comments VALUES(16,'ergerger','vafdfsdsfbdsf','hello-world');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('comments',16);
CREATE INDEX idx_comments_post_slug ON comments (post_slug);

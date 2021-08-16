DROP DATABASE IF EXISTS reactman;
DROP USER IF EXISTS reactman_user@localhost;

CREATE DATABASE reactman CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER reactman_user@localhost IDENTIFIED WITH mysql_native_password BY '@COW5cried4Wolve$';
GRANT ALL PRIVILEGES ON reactman.* TO reactman_user@localhost;



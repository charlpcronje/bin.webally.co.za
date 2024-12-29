/* backend/src/db/Database.js */
/**
 * @file backend/src/db/Database.js
 * Database configuration and connection pooling with MySQL.
 */

import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "cp",
  password: "4334.4334",
  database: "featured_pastbin",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

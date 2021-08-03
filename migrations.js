require('dotenv').config();

const fs = require('fs');
const path = require('path');
// const pool = require('./app/storages/DbStorage/db');
const db = require('./mysql-connection');

const migrationsPath = path.resolve(__dirname, './migrations');
const migrationFiles = fs.readdirSync(migrationsPath);

function runMigrations() {
  for (let i = 0; migrationFiles[i]; i++) {
    const fileName = migrationFiles[i];
    try {
      const data = fs.readFileSync(`${migrationsPath}/${fileName}`).toString();
      //ALTER TABLE students ADD `hobby` varchar(255);это то что в data
      db.query(data, (err, result) => {
        if (err) {
          console.log(`\x1b[31m%s\x1b[0m`, `Migration failed: ${fileName}`);
          console.log(err);
          return;
        } else {
          console.log(`\x1b[32m%s\x1b[0m`, `Migration succesfull: ${fileName}`);
        }
      });
    } catch (err) {
      // will be red
      console.log(`\x1b[31m%s\x1b[0m`, `Migration failed: ${fileName}`);
      console.log(err);
      return;
    }
  }
}
runMigrations();

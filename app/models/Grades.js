const db = require("../../mysql-connection");

class Grades {
  constructor(db) {
    this._db = db;
  }

  getBySurname(surname) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM grades where Surname=?`,
        [surname],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements.length === 0 ? null : elements[0]);
        }
      );
    });
  }

  createGrade(data) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO grades (name,surname, grade) VALUES (?, ?, ?)`,
        [data.name, data.surname, data.totalGrades],
        (error, result) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        }
      );
    });
  }
}

module.exports = new Grades(db);

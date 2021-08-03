const db = require('../../mysql-connection');
const GradesModel = require('../models/GradesModel');

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
          if (elements.length === 0) {
            return resolve(null);
          }
          const { id, name, surname, grade } = elements[0];
          return resolve(new GradesModel(id, name, surname, grade));
        },
      );
    });
  }

  createGrade(data) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO grades (name,surname, grade) VALUES (?, ?, ?)`,
        [data.name, data.surname, data.grade],
        (error, result) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        },
      );
    });
  }
}

module.exports = new Grades(db);

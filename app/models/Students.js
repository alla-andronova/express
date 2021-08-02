const db = require('../../mysql-connection');

class Students {
  constructor(db) {
    this._db = db;
  }

  //оборачиваем в промис чтобы избежать колбека из за которого рендер был бы в модели
  getAll() {
    return new Promise((resolve, reject) => {
      this._db.query('SELECT * FROM student', (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where id_Student=${id}`,
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements.length === 0 ? null : elements[0]);
        },
      );
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where email=?`,
        [email],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements.length === 0 ? null : elements[0]);
        },
      );
    });
  }

  createStudent(data) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO student (name,surname,email,age,gender,faculty_id) VALUES ('${data.name}', '${data.surname}', '${data.email}', ${data.age},'${data.gender}', 2)`,
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

module.exports = new Students(db);

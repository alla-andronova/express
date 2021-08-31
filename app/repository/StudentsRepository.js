const db = require('../../mysql-connection');
const StudentModel = require('../models/StudentModel');

class StudentsRepository {
  constructor(db) {
    this._db = db;
  }

  makeStudent(obj) {
    const { id, name, surname, age, gender, email, password } = obj;
    return new StudentModel(id, name, surname, age, gender, email, password);
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._db.query('SELECT * FROM student', (error, elements) => {
        if (error) {
          return reject(error);
        }

        const students = elements.map(obj => this.makeStudent(obj));
        return resolve(students);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where id= ? `,
        [id],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          if (elements.length === 0) {
            return resolve(null);
          }
          return resolve(this.makeStudent(elements[0]));
        },
      );
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where email=?`,
        [email],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          if (elements.length === 0) {
            return resolve(null);
          }
          return resolve(this.makeStudent(elements[0]));
        },
      );
    });
  }

  /**
   *
   * @param {StudentModel} data
   */
  saveStudent(data) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO student (name,surname,email,age,gender,faculty_id,password) VALUES(?,?,?,?,?,?,?)`,
        [
          data.name,
          data.surname,
          data.email,
          data.age,
          data.gender,
          2,
          data.password,
        ],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        },
      );
    });
  }

  updateStudent(data) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `UPDATE student SET name = ?, surname=?, email=?,age=?,gender=? WHERE id=?`,
        [data.name, data.surname, data.email, data.age, data.gender, data.id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        },
      );
    });
  }

  deleteStudent(studentId) {
    return new Promise((resolve, reject) => {
      this._db.query(
        `DELETE FROM student where id=?`,
        [studentId],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        },
      );
    });
  }
}

module.exports = new StudentsRepository(db);

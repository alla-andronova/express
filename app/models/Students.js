const db = require("../../mysql-connection");

class Students {
  //старый вариант с json
  // constructor(data) {
  //   this._data = data;
  // }

  constructor(db) {
    this._db = db;
  }

  //оборачиваем в промис чтобы избежать колбека из за которого рендер был бы в модели
  getAll() {
    return new Promise((resolve, reject) => {
      this._db.query("SELECT * FROM student", (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  }

  //старый метод который работал с json
  // getAll() {
  //   return this._data;
  // }

  getById(id) {
    // return this._data.find((entry) => Number(entry.id) === Number(id));

    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where id_Student=${id}`,
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements.length === 0 ? null : elements[0]);
        }
      );
    });
  }

  getByEmail(email) {
    // return this._data.find((entry) => Number(entry.id) === Number(id));

    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * FROM student where email=?`,
        [email],
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements.length === 0 ? null : elements[0]);
        }
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
          console.log(result);
          return resolve(result);
        }
      );
    });
    // should be validation for fields
    // business logic should be done here before saving new entry for Students
    // generate id for hardcoded data
    //старый метод который работал с json
    // const id = new Date().getTime();
    // this._data.push(Object.assign({}, data, { id }));
  }
}

module.exports = new Students(db);

/**
 * @property {string} name
 * @property {string} surname
 */
class StudentModel {
  constructor(id, name, surname, age, gender, email, password) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }

  getUserName() {}
}

module.exports = StudentModel;

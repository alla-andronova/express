//с маленькой буквы потому что экспортируем обькт
const bcrypt = require('bcrypt');
const StudentModel = require('../models/StudentModel');
const studentsRepository = require('../repository/StudentsRepository');

class StudentsController {
  async getAllStudents(req, res) {
    try {
      const students = await studentsRepository.findAll();

      res.render('pages/students', { students });
      //в обьекте студент передаем обьект студента для ejs
    } catch (err) {
      throw err;
    }
  }

  async getStudentById(req, res) {
    const { studentId } = req.params;
    try {
      const student = await studentsRepository.findById(studentId);

      if (!student) {
        res.render('pages/error');
      } else {
        res.render('pages/student', { student });
      }
    } catch (err) {
      throw err;
    }
  }

  renderForm(req, res) {
    res.render('pages/addStudent', { isAdded: false });
  }

  async renderFormUpdateStudent(req, res) {
    const { studentId } = req.params;
    try {
      const student = await studentsRepository.findById(studentId);

      if (!student) {
        res.render('pages/error');
      } else {
        res.render('pages/updateStudent', { student });
      }
    } catch (err) {
      throw err;
    }
  }

  async updateStudent(req, res) {
    const { studentId } = req.params;
    try {
      const student = await studentsRepository.findById(studentId);

      if (!student) {
        res.render('pages/error');
      } else {
        const { name, surname, age, gender, email } = req.body;
        student.name = name;
        student.surname = surname;
        student.age = age;
        student.gender = gender;
        student.email = email;
        await studentsRepository.updateStudent(student);

        res.render('pages/updateStudent', { student });
      }
    } catch (err) {
      throw err;
    }
  }

  async createStudent(req, res) {
    try {
      const student = await studentsRepository.findByEmail(req.body.email);
      if (student) {
        res.write('There is a such email already');
        res.end();
        return;
      }

      const { name, surname, age, gender, email, password } = req.body;
      //перед отправкой зашифровали пароль студента
      const hashedPassword = bcrypt.hashSync(password, 10);

      await studentsRepository.saveStudent(
        new StudentModel(
          null,
          name,
          surname,
          age,
          gender,
          email,
          hashedPassword,
        ),
      );
      res.cookie('studentSurname', req.body.surname);

      res.render('pages/addStudent', { isAdded: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteStudent(req, res) {
    const { studentId } = req.params;
    try {
      await studentsRepository.deleteStudent(studentId);

      res.render('pages/deleteStudent', { studentId });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = StudentsController;

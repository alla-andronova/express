const Students = require('../models/Students');

class StudentsController {
  async main(req, res) {
    const { studentId } = req.params;
    try {
      if (studentId) {
        const student = await Students.getById(studentId);

        if (!student) {
          res.render('pages/error');
        } else {
          res.render('pages/student', { student });
        }
      } else {
        const students = await Students.getAll();
        res.render('pages/students', { students });
        //в обьекте студент передаем обьект студента для ejs
      }
    } catch (err) {
      throw err;
    }
  }

  renderForm(req, res) {
    // console.log("render form");
    res.render('pages/addStudent', { isAdded: false });
  }

  async createStudent(req, res) {
    try {
      const student = await Students.getByEmail(req.body.email);
      if (student) {
        res.write('There is a such email already');
        res.end();
        return;
      }

      await Students.createStudent(req.body);
      res.cookie('studentSurname', req.body.surname);

      res.render('pages/addStudent', { isAdded: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteStudent(req, res) {
    const { studentId } = req.params;
    try {
      await Students.deleteStudent(studentId);

      res.render('pages/deleteStudent');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = StudentsController;

const Students = require("../models/Students");

// this will called when url === "/students"
// function StudentsController(req, res) {
//   const { studentId } = req.params;
//   if (studentId) {
//     const student = Students.getById(studentId);
//     if (!student) {
//       res.render("pages/error");
//     } else {
//       res.render("pages/student", { student });
//     }
//   } else {
//     const students = Students.getAll();
//     res.render("pages/students", { students });
//   }
// }

class StudentsController {
  // used for students list and individual student page
  async main(req, res) {
    const { studentId } = req.params;
    if (studentId) {
      const student = await Students.getById(studentId);

      if (!student) {
        res.render("pages/error");
      } else {
        res.render("pages/student", { student });
      }
    } else {
      const students = await Students.getAll();
      res.render("pages/students", { students });
      //в обьекте студент передаем обьект студента для ejs
    }
  }
  // used for rendering create student form
  renderForm(req, res) {
    // console.log("render form");
    res.render("pages/addStudent", { isAdded: false });
  }
  // used for POST request from the form, and adding new student
  async createStudent(req, res) {
    const student = await Students.getByEmail(req.body.email);
    if (student) {
      res.write("There is a such email already");
      res.end();
      return;
    }

    await Students.createStudent(req.body);

    // return the same form
    res.render("pages/addStudent", { isAdded: true });
  }
}

module.exports = StudentsController;

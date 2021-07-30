const Grades = require("../models/Grades");

class GradesController {
  // used for students list and individual student page

  // used for rendering create student form
  renderGradesForm(req, res) {
    // console.log("render form");
    res.render("pages/gradesForm", { isAdded: false });
  }
  // used for POST request from the form, and adding new student
  async createGrade(req, res) {
    const student = await Grades.getBySurname(req.body.surname);
    if (student) {
      res.write(`You have filled already your grade was ${student.grade}`);
      res.end();
      return;
    }

    await Grades.createGrade(req.body);

    // return the same form

    res.write(`Your grade is ${req.body.totalGrades}`);
    res.end();
  }
}

module.exports = GradesController;

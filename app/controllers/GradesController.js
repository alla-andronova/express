const Grades = require('../models/Grades');

class GradesController {
  renderGradesForm(req, res) {
    // console.log("render form");
    res.render('pages/gradesForm');
  }

  async createGrade(req, res) {
    try {
      const student = await Grades.getBySurname(req.body.surname);
      if (student) {
        res.write(`You have filled already your grade was ${student.grade}`);
        res.end();
        return;
      }

      await Grades.createGrade(req.body);

      res.write(`Your grade is ${req.body.totalGrades}`);
      res.end();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = GradesController;

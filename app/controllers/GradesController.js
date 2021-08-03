const GradesModel = require('../models/GradesModel');
const gradesRepository = require('../repository/GradesRepository');

class GradesController {
  renderGradesForm(req, res) {
    // console.log("render form");
    res.render('pages/gradesForm');
  }

  async createGrade(req, res) {
    try {
      const student = await gradesRepository.getBySurname(req.body.surname);
      if (student) {
        res.write(`You have filled already your grade was ${student.grade}`);
        res.end();
        return;
      }
      const { name, surname, totalGrades } = req.body;

      await gradesRepository.createGrade(
        new GradesModel(null, name, surname, totalGrades),
      );

      res.write(`Your grade is ${req.body.totalGrades}`);
      res.end();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = GradesController;

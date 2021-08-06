const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const studentsRepository = require('../repository/StudentsRepository');

class LoginController {
  renderForm(req, res) {
    res.render('pages/login');
  }

  async handleLogin(req, res) {
    const { email, password } = req.body;
    const student = await studentsRepository.findByEmail(email);
    if (!student) {
      res.write('login failed');
      res.end();
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      student.password || '',
    );
    if (!isPasswordCorrect) {
      res.write('login failed');
      res.end();
      return;
    }
    const token = jwt.sign({ studentId: student.id }, 'shhhhh');
    res.write(`login succesfull your token is ${token}`);
    res.end();
  }
}
module.exports = LoginController;

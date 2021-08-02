const StudentsRepository = require('../repository/StudentsRepository');

class Students {
  getAll() {
    return StudentsRepository.findAll();
  }

  getById(id) {
    return StudentsRepository.findById(id);
  }

  getByEmail(email) {
    return StudentsRepository.findByEmail(email);
  }

  createStudent(data) {
    return StudentsRepository.saveStudent(data);
  }

  deleteStudent(studentId) {
    return StudentsRepository.deleteStudent(studentId);
  }
}

module.exports = new Students();

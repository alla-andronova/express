const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const MainController = require("./app/controllers/MainController");
const StudentsController = require('./app/controllers/StudentsController');
const GradesController = require('./app/controllers/GradesController');

const StudentsCtrl = new StudentsController();
const GradesCtrl = new GradesController();

const server = express();

// set templating engine
server.set('view engine', 'ejs');
// change default location of templating engine views
server.set('views', path.resolve(__dirname, 'app/views'));

// express.static
/**
 * --> server.uses("assets/main.css", function (req, res) { return the file })
 * --> "assets/main.js"
 */
//раздавать все файлы из этой папки как статические файлы
server.use(express.static(path.resolve(__dirname, 'assets')));

// used to parse req.body(form) for POST,PUT requests
server.use(bodyParser.urlencoded({ extended: false }));

server.use(cookieParser());

// routing
// server.use("*", MainController);

server.get('/', function (req, res) {
  // res.send("Home");
  res.render('pages/index', { content: 'This is home' });
});

server.get('/students', StudentsCtrl.main);
server.get('/students/create', StudentsCtrl.renderForm);
server.post('/students/create', StudentsCtrl.createStudent);
server.get('/students/:studentId(\\d+)/', StudentsCtrl.main);
server.get('/students/:studentId(\\d+)/delete', StudentsCtrl.deleteStudent);
server.get('/students/gradesForm', GradesCtrl.renderGradesForm);
server.post('/students/gradesForm', GradesCtrl.createGrade);

server.use('*', function (req, res) {
  res.render('pages/error');
});

const port = 3000;
// start server
server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});

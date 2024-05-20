const exp = require('express')
const courseController = require('../controller/courseController')
const routes = exp.Router()
// routes.use(exp.json())

//create course 
routes.post('/createCourse',courseController.createCourse)

//Get all courses 
routes.get('/getCourses',courseController.getCourses)

//Get course by id
routes.get('/getCourse/:id',courseController.getCourse)

//Update course by id
routes.put('/updateCourse',courseController.updateCourse)

//Delete course by id
routes.delete('/deleteCourses/:id',courseController.deleteCourse)


module.exports = routes;
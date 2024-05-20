const exp = require('express')
const courseApp = exp.Router()


const createCourse = async (req,res)=>{
    const { id, courseTitle, courseSylabus, courseFee, courseDuration, courseSdEd, courseHighlights, courseBenifit } = req.body;

    const connection = req.app.get('connection')

    const sql = 'INSERT INTO courses (id, courseTitle, courseSylabus, courseFee, courseDuration, courseDates, courseHighlights, courseBenfit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const results =connection.query(sql, [id, courseTitle, courseSylabus, courseFee, courseDuration, courseSdEd, courseHighlights, courseBenifit])
    console.log("query result :",results)

    if(results)
        {
        res.send({message:"course created successfully",payload:courseTitle})
        }
        else{
        res.send({message:"failed to create course"})
        }
}

const getCourses =async(req,res)=>{
        const connection = req.app.get('connection')
        const results = req.app.get('results')
        try {
            const sql = 'SELECT * FROM courses';
            const results = await connection.query(sql)
            console.log(results)

            if(!results){
            res.send({message:"failed to create"})
            }
            else{
            res.status(200).send({message:'details fetched successfully',data:results[0]})
            } 
        } catch (error) {
            console.log(error)
            res.status(500).send({success:false,message:"Error in get all courses",error})
        }
}

const getCourse =async(req,res)=>{
        try {
            const connection = req.app.get('connection')
            const courseId = req.params.id;
            console.log(courseId)
            const results = await connection.query('SELECT * FROM courses WHERE id = ?', [courseId]) 
        
            console.log(results)
            if(!results)
            {
                res.status().send({message:'course not found'})
            }
            else{
                res.status(200).send({message:'course details',data:results[0]})
            }
        } catch (error) {
        console.log(error)
        res.status(500).send({error}) 
        }
}

const updateCourse =async(req,res)=>{
        try {
            const connection = req.app.get('connection')
            const courseId = +req.body.id
            console.log( "id: ",courseId)
        
            const { courseTitle, courseSylabus, courseFee, courseDuration, courseDates, courseHighlights, courseBenfit } = req.body;
            const result= await connection.query('UPDATE courses SET courseTitle = ?, courseSylabus = ?, courseFee = ?,courseDuration = ?, courseDates = ?, courseHighlights = ?, courseBenfit = ? WHERE id = ?', [courseTitle, courseSylabus, courseFee, courseDuration, courseDates, courseHighlights, courseBenfit, courseId])
            console.log(result)
            if(!result){
            res.status(404).send({message:'course not found'})
            }
            else{
            res.status(200).send({message:'updated successfully',data:result[0]})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error) 
        }
}

const deleteCourse =async(req,res)=>{
        try {
            const connection = req.app.get('connection')
            const courseId = req.params.id;
            const result= await connection.query('DELETE FROM courses WHERE id = ?', [courseId]) 
            console.log(result)
            if (!result) {
            res.status(404).send({message:'course not found'})
            }
            else{
            res.status(200).send({message:'deleted course successfully'})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message:'error in delete course'})
        }
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
}
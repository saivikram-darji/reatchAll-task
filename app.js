const exp = require('express')
const app = exp()
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv').config();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2/promise');

(async () => {
  let connection;

  try {
      // Create a connection to the database
      connection = await mysql.createConnection({
        host: '13.50.235.169',   
        user: 'root',        
        password: 'root', 
        database: 'client_reatchall',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      console.log('Connected to the database');
      
      // sharing db to routes
      app.set('connection',connection)


  } catch (err) {
      console.error('Error:', err);
  } 
})();

console.log(process.env.DB_HOST);  // 'localhost'

//adjusting the image size
app.use(bodyParser.json({limit:'10mb'}))

app.use('/courses-api',require('./routes/courseRoutes'))
app.use('/banner-api',require('./routes/bannerRoutes'))

//invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

//error handling
app.use((error,req,res,next)=>{
    res.send({message:`Error occured`,payload:error.message})
})

app.listen(4000,()=>console.log("server is running on port 4000"))
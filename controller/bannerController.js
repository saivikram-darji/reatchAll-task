const exp = require('express')
const bodyParser = require('body-parser'); 

const createBanner = async(req,res) => {
    try {
        const connection = req.app.get('connection')
        const { id, image, title, slotDate, priority, status } = req.body;
  
        console.log(image)
        if(!image){
          res.status(500).send({message:'no image provided'})
        }
        
        // const imageBuffer = Buffer.from(image,'base64')
  
    
        const sql = 'INSERT INTO banner (id, bannerImage, title, slotDate, priority, status) VALUES (?,?, ?, ?, ?, ?)';
        const result = await connection.query(sql, [id, image, title, slotDate, priority, status], (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          else{
            console.log("banner details inserted")
            res.status(201).json({ message: 'Banner created successfully' });
          }
        })
        console.log(results)
      } catch (error) {
        console.log(error)
        res.status(500).send({error})
      }
}

const getBanners = async(req,res) => {
    try {
        const connection = req.app.get('connection')
        const sql = 'SELECT * FROM banner';
        const result= await connection.query('SELECT * FROM banner')
        console.log(result)

        if(!result){
          res.status(404).send({message:'banner not found'})
        }
        else{
          res.status(200).send({message:'all banners details'})
        }
    } catch (error) {
      console.log(error)
      res.status(500).send({message:'error in get all banners'})
    }
}

const getBanner = async(req,res) => {
    try {
        const connection = req.app.get('connection')
        const bannerId = req.params.id;
        const sql = 'SELECT * FROM banner WHERE id = ?';
        const result = await connection.query(sql, [bannerId])
        console.log(result)
    
        if(!result){
          res.status(404).send({message:'banner not found'})
        }
        else{
          res.status(200).send({message:'banner details',data:result[0]})
        }
      } catch (error) {
        console.log(error)
        res.status.send({message:'error in get banner by id'})
      }
}

const updateBanner = async(req,res) => {
    try {
        const connection = req.app.get('connection')
        const bannerId = req.params.id;
        const { id, bannerImage, title, slotDate, priority, status } = req.body;
        const result = await connection.query('UPDATE banner SET bannerImage = ?, title = ?, slotDate = ?, priority = ?, status = ? WHERE id = ?', [bannerImage, title, slotDate, priority, status, bannerId])
        console.log({result})
  
        if(!result){
          res.status(404).send({message:'user not found'})
        }
        else{
          res.status(200).send({message:'banner updated successfully'})
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message:'error in update banner by id'})
      }
}

const deleteBanner = async(req,res) => {
    try {
        const connection = req.app.get('connection')
        const bannerId = req.params.id;
        const result = await connection.query('DELETE FROM banner WHERE id = ?', [bannerId])
        console.log(result)
  
        if(!result){
          res.status(404).send({message:'banner not found'})
        }
        else{
          res.status(200).send({message:'banner deleted successfully'})
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message:'error in delete banner by id'})
      }
}

module.exports = {
    createBanner,
    getBanners,
    getBanner,
    updateBanner,
    deleteBanner
}
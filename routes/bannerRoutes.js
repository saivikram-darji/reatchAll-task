const exp = require('express')
const routes = exp.Router();
const bannerController = require('../controller/bannerController')


//create banner route
routes.post('/createBanner',bannerController.createBanner)

// get all banners route
routes.get('/getBanners',bannerController.getBanners)

// get banner by id
routes.get('/getBanner/:id',bannerController.getBanner)

// update banner by id
routes.put('/updateBanner',bannerController.updateBanner)

// delete banner by id
routes.delete('/deleteBanner/:id',bannerController.deleteBanner)


module.exports = routes;
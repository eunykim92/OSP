const express = require('express');
const router = express.Router();

const cookieController = require('../controllers/cookieController');
const imageController = require('../controllers/imageController');
const designController = require('../controllers/designController');
const componentController = require('../controllers/componentController');

router.post(
  '/add',
  cookieController.decryptCookie,
  imageController.uploadImage,
  designController.addDesign,
  componentController.addComponents,
  (req, res, next) => {
    console.log(res.locals.onlineImageUrl);
    return next();
  },
  (req, res) => res.status(200).send({ design_id: res.locals.designId })
);

module.exports = router;

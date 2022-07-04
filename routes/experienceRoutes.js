const express = require('express')

const router = express.Router();
const {getExperience} =  require('../controllers/controller');

// experince Routes

router.get('/experience/:id', getExperience);

module.exports =  router;
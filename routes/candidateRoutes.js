const express = require('express')

const router = express.Router();
const {getCandidate, 
    updateCandidate,
    getPermission,
    updatePermission,
    updateExperience,
    addExperience
} =  require('../controllers/controller');

// candidate Routes
router.get('/candidate/:id', getCandidate);
router.put('/candidate/:id', updateCandidate);

// permission Routes
router.get('/permission/:id', getPermission);
router.put('/permission/:id', updatePermission);

// experince Routes
router.put('/experience/:id', updateExperience);
router.post('/experience/:id', addExperience);

module.exports =  router;
const express = require('express')

const router = express.Router();
const {getCandidate, 
    updateCandidate,
    getPermission,
    updatePermission,
    updateExperience,
    addExperience,
    signIn
} =  require('../controllers/controller');
const {verifyToken} = require('../middleware/authJwt');

// candidate Routes
router.get('/candidate/:id', verifyToken, getCandidate);
router.put('/candidate/:id', verifyToken, updateCandidate);

// permission Routes
router.get('/permission/:id', verifyToken, getPermission);
router.put('/permission/:id', verifyToken, updatePermission);

// experince Routes
router.put('/experience/:id', verifyToken, updateExperience);
router.post('/experience/:id', verifyToken, addExperience);

// user Routes
router.post('/signin', signIn);
module.exports =  router;
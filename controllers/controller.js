const db = require('../models/connection');
const jwt = require("jsonwebtoken");

const {errorMessage, successMessage, status} = require('../helpers/status');
const {getCandidateQuery, 
    getExperienceQuery, 
    updateCandidateQuery, 
    updateExperienceQuery,
    getPermissionQuery,
    updatePermissionQuery,
    insertExperienceQuery,
    signInQuery
} = require('../models/queries')

/**
   * candidate data
   * @param {object} req
   * @param {object} res
   * @returns {object} data object
   */
const getCandidate = async (req, res) => {
    const values = [req.params.id];
    try {
        const {rows:candidateData} = await db.query(getCandidateQuery, values);
        const {rows:experienceData} = await db.query(getExperienceQuery, values);

        successMessage.data = {...candidateData[0], experience: []}
        successMessage.data.experience = experienceData;
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

/**
   * candidate data
   * @param {object} req
   * @param {object} res
   * @returns {object} data object
   */
const updateCandidate = async (req, res) => {
    const id = req.params.id;
    const {name, age} = req.body;
    try {
        await db.query(updateCandidateQuery, [name, age, id]);
        // experience.forEach(async (element) => {
        //     const {start_date, end_date, job_title, company, job_description} = element;
        //     await db.query(updateExperienceQuery, [start_date, end_date, job_title, company, job_description, id]);     
        // });
        return res.status(status.created).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

const getPermission = async (req, res) => {
    const values = [req.params.id];
    try {
        const {rows} = await db.query(getPermissionQuery, values);
        successMessage.data = {...rows[0]}
        return res.status(status.success).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

const updatePermission = async (req, res) => {
    const id = req.params.id;
    const {name, age, picture, experience} = req.body;
    try {
        await db.query(updatePermissionQuery, [name, age, picture, experience, id]);
        return res.status(status.created).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

const updateExperience = async (req, res) => {
    const id = req.params.id;
    const {startDate, endDate, jobTitle, company, jobDescription} = req.body;
    try {
        await db.query(updateExperienceQuery, [ startDate, endDate, jobTitle, company, jobDescription, id]);
        return res.status(status.created).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

const addExperience = async (req, res) => {
    const id = req.params.id;
    const {startDate, endDate, jobTitle, company, jobDescription} = req.body;
    try {
        const {rows} = await db.query(insertExperienceQuery, [id, startDate, endDate, jobTitle, company, jobDescription]);
        successMessage.data = {...rows[0]}
        return res.status(status.created).send(successMessage);
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const {rows} = await db.query(signInQuery, [email, password]);
        var token = jwt.sign({ email: email }, process.env.SECRET, {expiresIn: 86400});
        if(rows.length>2) {
            return res.status(status.error).send('Invalid credients');
        } else {
            delete rows[0].password;
            successMessage.data = {...rows[0]};
            successMessage.token = token;
            return res.status(status.created).send(successMessage);
        }
    } catch (err) {
        console.log(err);
        return res.status(status.error).send(err);
    }
}

module.exports = {
    getCandidate,
    updateCandidate,
    getPermission,
    updatePermission,
    updateExperience,
    addExperience,
    signIn
}
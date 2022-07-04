const getCandidateQuery = 'SELECT id, name,email,age FROM candidate WHERE id = $1';
const getExperienceQuery = 'SELECT * FROM experience WHERE candidate_id = $1';
const getPermissionQuery = 'SELECT * FROM permission WHERE candidate_id = $1';

const insertExperienceQuery = `INSERT INTO experience(candidate_id, start_date, end_date, job_title, company, job_description)
VALUES ($1, $2, $3, $4, $5, $6)`

const updateCandidateQuery = `UPDATE candidate
    SET name = $1,
        age = $2 
    WHERE id = $3`;
const updateExperienceQuery = `UPDATE experience 
    SET start_date = $1, 
        end_date = $2, 
        job_title = $3, 
        company = $4, 
        job_description = $5 
    WHERE id = $6`;
const updatePermissionQuery = `UPDATE permission
    SET name = $1,
        age = $2,
        picture = $3,
        experience = $4 
    WHERE id = $5`;    

module.exports = {
    getCandidateQuery,
    getExperienceQuery,
    updateCandidateQuery,
    updateExperienceQuery,
    getPermissionQuery,
    updatePermissionQuery,
    insertExperienceQuery
};
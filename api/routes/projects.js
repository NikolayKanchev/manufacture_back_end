const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const verifyToken = require('../middleware/verify-token');

router.post('/addProject', projects.addProject);
router.get('/getProjects/:id', projects.getProjects);

module.exports = router;
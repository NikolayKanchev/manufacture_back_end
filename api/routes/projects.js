const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const verifyToken = require('../middleware/verify-token');

router.post('/add-project', projects.addProject);
router.post('/edit-project', projects.editProject);
router.get('/getProjects/:id', projects.getProjects);
router.get('/get-by-id/:id', projects.getById);
router.delete('/delete/:id', projects.deleteProject);
router.delete('/product-line/delete/:id', projects.deleteProductLine);



module.exports = router;
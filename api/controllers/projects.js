require('dotenv').config();
const Project = require('../models/Project');

exports.addProject = async (req, res, next) => {
    
    const data = req.body;

    const project = {
        user_id: "2",
        name: data.name,
        desc: data.description
    }
    
    // console.log(project);

    // user_id
    // name
    // desc
    
    const response = await Project.query().insert(project);

    res.status(200).send({ ...response });
}


exports.getProjects = async(req, res, next) => {
    const response = await Project.query().select().where({ userId: req.params.id });  
    res.status(200).send({ ...response });
}

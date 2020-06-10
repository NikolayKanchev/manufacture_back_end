require('dotenv').config();
const Project = require('../models/Project');
const LineProduct = require('../models/LineProduct');

exports.addProject = async (req, res, next) => {
    
    const { userId, name, desc, productLines } = req.body;
    console.log(userId, name, desc, productLines);

    const project = await Project.query().insert({ userId, name, desc });

    productLines.map( async (pl) => {
        const line = {
            projectId: project.id, productTypeId: pl.productTypeId.id, 
            quantity: pl.quantity, howOften: pl.howOften.name,
        }
        await LineProduct.query().insert(line);
    })

    res.status(200).send({ message: "OK" });
}

exports.editProject = async (req, res, next) => {
    
    const { projectId, name, desc, productLines } = req.body;
    console.log(projectId, name, desc, productLines);

    const project = await Project.query()
    .findById(projectId)
    .patch({
        name,
        desc
    });
    
    
    productLines.map( async (pl) => {
        if (pl.id === undefined){
            const line = {
                projectId: pl.projectId, productTypeId: pl.type.id, 
                quantity: pl.quantity, howOften: pl.howOften.name,
            }
            await LineProduct.query().insert(line);
        }else{

            await LineProduct.query()
            .findById(pl.id)
            .patch({
                productTypeId: pl.type.id,
                quantity: pl.quantity,
                howOften: pl.howOften
            });
        }
    })

    res.status(200).send({ message: "OK" });
}



exports.getProjects = async(req, res, next) => {

    const projects = await Project.query().select().where({ userId: req.params.id });

    const loopTrueObjects = () => {
        const promises = []; 

        Object.keys(projects).forEach( async (key) => {
            promises.push(new Promise(async (resolve) => {
                const project = {...projects[key]};
                project.lines = await LineProduct.query().select().where({ projectId: project.id }).withGraphFetched('type');
                resolve(project);
            }));
        });

        Promise.all(promises)
        .then((projects) => {                                 
            res.status(200).json({ projects });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    loopTrueObjects();
}

exports.deleteProject = async (req, res, next) => {
    const id = req.params.id;
    Project.query().where({ id: id }).del()
    .then(
        res.status(200).json({ message: "The project was deleted!" })
    );
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const project = await Project.query().findById(id);
    project.lines = await LineProduct.query().select().where({ projectId: project.id }).withGraphFetched('type');
    res.status(200).json(project)
}

exports.deleteProductLine = async (req, res, next) => {
    const id = req.params.id;
    LineProduct.query().where({ id: id }).del()
    .then(
        res.status(200).json({ message: "The product was deleted!" })
    );
}

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
        console.log(line);
    })

    res.status(200).send({ message: "OK" });
}


exports.getProjects = async(req, res, next) => {
    const response = await Project.query().select().where({ userId: req.params.id });

    const loopTrueObjects = () => {
        const promises = [];

        Object.keys(response).forEach( async (key) => {

            promises.push(new Promise(async (resolve) => {

                const project = {...response[key],}
                project["productLines"] = [];

                const lines = await LineProduct.query().select().where({ projectId: project.id });
                Object.keys(lines).forEach((k) => project["productLines"].push({...lines[k]}));

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
    
    loopTrueObjects()
}

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const BaseUser = require('../models/BaseUser');
const Company = require('../models/Company');
const Manufacturer = require('../models/Manufacturer');
const User = require('../models/User');
const Plan = require('../models/Plan');


exports.signup = async(req, res, next) => {

    const { firstName, lastName, email, password, userType, planId } = req.body;
    
    if (email && password) {
        const users = await BaseUser.query().select().where({ email: email });

        if(users.length >= 1){
            return res.status(409).json({
                message: 'An user with this e-mail already exist!'
            });

        }else{
            bcrypt.hash(password, saltRounds, async (error, hash) => {
                if (error) {
                    res.status(500).json({ response: "Problem hashing the password" });
                }
                const newBaseUser = { email: email, password: hash, plan_id: planId, is_manufacturer: userType === "manufacturer"? true: false };
                const returVal = await BaseUser.query().insert(newBaseUser);

                if (userType === "people"){
                    await User.query().insert({ base_user_id: returVal.id, company_id: null, name: firstName + " " + lastName});
                    res.status(200).send({ message: "Your registration was successful!" });

                }else if (userType === "company"){
                    const { name, regNumber, address, country, img, phone } = req.body;
                    const company = await Company.query().insert({name, reg_number:regNumber, address, country, img, phone});
                    await User.query().insert({ base_user_id: returVal.id, company_id: company.id, name: firstName + " " + lastName});
                    res.status(200).send({ message: "Your registration was successful!" });

                }else if (userType === "manufacturer"){
                    const { contactPerson, name, regNumber, address, country, img, phone } = req.body;
                    const company = await Company.query().insert({name, reg_number:regNumber, address, country, img, phone});
                    await Manufacturer.query().insert({ base_user_id: returVal.id, company_id: company.id, contact_person: contactPerson});
                    res.status(200).send({ message: "Your registration was successful!" });

                }else{
                    res.status(500).send({ message: "something went wrong" });
                }
            });
        }

    } else {
        res.status(400).json({ response: "Missing password" });
    }
}

exports.login = async(req, res, next) => {

    const users = await BaseUser.query().select().where({ email: req.body.email });
    const user = users[0];

    if(users.length < 1){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }else{
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            if(result){
                const plan = await Plan.query().findById(user.planId);

                const dataToReturn = {};
                dataToReturn.planId = plan.id;

                if(user.isManufacturer){
                    const manufacturers = await Manufacturer.query().select().where({ baseUserId: user.id })
                    const company = await Company.query().findById(manufacturers[0].companyId);                                    
                    dataToReturn.user = {...manufacturers[0]};
                    dataToReturn.company = {...company};
                    dataToReturn.user.email = user.email;
                    dataToReturn.userType = "manufacturer";

                }else{
                    const normalUser = await User.query().select().where({ baseUserId: user.id });

                    if (normalUser[0].companyId){
                        const company = await Company.query().findById(normalUser[0].companyId);
                        dataToReturn.user = {...normalUser[0]};
                        dataToReturn.company = {...company};
                        dataToReturn.user.email = user.email;
                        dataToReturn.userType = "company";
                    }else{
                        dataToReturn.user = {...normalUser[0]};
                        dataToReturn.user.email = user.email;
                        dataToReturn.userType = "people";
                    }
                    
                }
                
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, 
                "" + process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    usersData: dataToReturn
                });
            }

            res.status(401).json({
                message: 'Auth failed'
            });
        });
    }
}

exports.resetPass = async(req, res, next) => {
    const email = req.body.email;    

    const users = await BaseUser.query().select().where({ email: email });

    if(users.length < 1){
        return res.status(404).json({
            message: "User with email '" + email + "' does not exist!"
        });
    }else{
        const user = users[0];           
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, 
        "" + process.env.JWT_KEY,
        {
            expiresIn: "1h"
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            from: "manufacturer.help@gmail.com",
            to: `${user.email}`,
            subject: "Link to reset password!",
            text: `Here is the link to reset your password: \n\n` +
                `http://localhost:3000/updatePass/${token} \n\n` +
                `If you did not request this, please ignore this email !!!`
        }

        transporter.sendMail(mailOptions, (err, response) => {
            if(err){
                console.log("Error sending email: " + err);
            }else{
                res.status(200).json({ message: "Recovery email sent! Please check your email" })
            }
        })
    }
}

exports.updatePass = async(req, res, next) => {
    
    const email = req.userData.email;
    const pass = req.body.password;

    const users = await BaseUser.query().select().where({ email: email });
    const user = users[0];    

    if(users.length >= 1){
        
        bcrypt.hash(pass, saltRounds, async (error, hash) => {
            if(error){
                console.log(error);
                
                return res.status(500).json({
                    error: error
                });
            }else{
                const numUpdated = await BaseUser.query()
                    .findById(user.id)
                    .patch({
                        password: hash
                });
                if(numUpdated === 1){
                    res.status(200).json({
                        message: 'Password Updated!'
                    });
                }else{
                    res.status(404).json({
                        message: 'Something went wrong!'
                    });
                }
            };
        });
    }else{
        res.status(404).json({
            message: 'User with email "'+ email +'" not found!'
        });
    }
}

exports.delete_one = async(req, res, next) => {

    const numDeleted = await BaseUser.query().deleteById(req.params.userId);

    if( numDeleted === 0){
        res.status(404).json({
            message: "The user you are trying to delete doesn't exist!"
        });
    }else{
        res.status(200).json({
            message: 'Deleted successfully'
        });
    }
}
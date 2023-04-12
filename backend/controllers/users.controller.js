const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.getUsers = (req,res) => {
    User.findAll()
    .then(users => {
        res.status(200).send({
            users: users
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}


const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

exports.getItems = (req,res) => {
    Item.findAll()
    .then(items => {
        res.status(200).send({
            items: items
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}
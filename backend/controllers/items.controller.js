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
exports.addItem =  (req,res) => {
     // Get a reference to a container
    const containerClient = blobServiceClient?.getContainerClient('items');

     // Create a unique name for the blob
    const blobName = 'eCommerceNoPicture' + uuidv1() + '.jpg';
 
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
 
    // Display blob name and url
    console.log(
        `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );
    
    // Upload data to the blob
    const uploadBlobResponse = blockBlobClient.upload(req.body.picture, req.body.picture.length);
    console.log(
        `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    );
    
    Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        picture: blockBlobClient.url
    })
    .then(item => {
        res.status(200).send({
            message: "Item added successfully"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

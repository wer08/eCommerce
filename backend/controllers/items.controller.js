const db = require("../models");
const Item = db.item;
const User = db.user;
const Op = db.Sequelize.Op;
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require('@azure/identity');


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
    let url = ""
    console.log(req.body,req.file)

    if(req.file){
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');
      
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          new DefaultAzureCredential()
        );
         // Get a reference to a container
        const containerClient = blobServiceClient?.getContainerClient('items');
    
         // Create a unique name for the blob
        const blobName = 'eCommerce' + uuidv1() + '.jpg';
     
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
     
        // Display blob name and url
        console.log(
            `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
        );
        
        // Upload data to the blob
        const uploadBlobResponse = blockBlobClient.upload(req.file.buffer, req.file.buffer.length);
        console.log(
            `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );
        url = blockBlobClient.url
    }
    else{
        url = "https://wojtekstorage.blob.core.windows.net/items/eCommerceNoPicture06fc1920-de78-11ed-b693-1356169cbdae.jpg"
    }
 
    
    Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        picture: url
    })
    .then(item => {
        User.findOne({
            where:{
                id: JSON.parse(req.body.user).id
            }
        })
        .then(user=>{
            item.setUser(user)
            res.status(200).send({
                message: "Item added successfully"
            })
        })
        .catch(error=>{
            console.log(error.message)
        })

    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

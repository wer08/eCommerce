const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs = require('fs');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require('@azure/identity');



const buffer = fs.readFileSync('./media/NoPicture.jpg');
let defImgURL = ""

const azureSetup = async () => {
  try{
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
  
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );

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
  const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.length);
  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
  );
  console.log('\nListing blobs...');

  defImgURL = blockBlobClient.url;
  }catch(error){
    throw error.message
  }
}


const app = express();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
    credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eCommerve application." });
});
const db = require("./models");
const Role = db.role;
const Item = db.item;
const User = db.user;
db.sequelize.sync({
  alter: true
}).then(() => {
    azureSetup()
    .then(()=>{
      initial();
    });
  })
  ;
  
  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });

    Item.create({
      name: "randomItem1",
      description: "This is first random item",
      price: 55.67,
      picture: defImgURL
    })
    Item.create({
      name: "randomItem2",
      description: "This is second random item",
      price: 12.54,
      picture: defImgURL
    })
    User.create({
      username: 'wer08',
      email: 'wer08@mail.pl',
      password: 'M0rg0th&CO'
    })

   


  }

//routes
require('./routes/auth.routes')(app);
require('./routes/users.routes')(app);
require('./routes/user.routes')(app);
require('./routes/items.routes')(app);



// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});


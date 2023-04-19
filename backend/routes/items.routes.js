const controller = require("../controllers/items.controller")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/items/all", controller.getItems);
  app.post("/api/items/add",upload.single("picture"), controller.addItem);

};
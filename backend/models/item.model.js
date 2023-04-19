module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {

      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      picture: {
        type: Sequelize.STRING
      }
    });
  
    return Item;
  };
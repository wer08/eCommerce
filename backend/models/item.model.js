module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {

      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMBER
      }
    });
  
    return User;
  };
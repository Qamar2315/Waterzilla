module.exports= (sequelize,DataTypes)=>{
    const Orders= sequelize.define("Orders", {
        status:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Orders.associate=(models)=>{
        Orders.belongsTo(models.Address);
        Orders.belongsTo(models.Bottle);
        Orders.belongsTo(models.Customer)
    };
    return Orders;
}
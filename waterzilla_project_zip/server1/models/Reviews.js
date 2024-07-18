module.exports= (sequelize,DataTypes)=>{
    const Reviews= sequelize.define("Reviews", {
        description:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Reviews.associate=(models)=>{
        Reviews.belongsTo(models.Bottle);
        Reviews.belongsTo(models.Customer)
    };
    return Reviews;
}
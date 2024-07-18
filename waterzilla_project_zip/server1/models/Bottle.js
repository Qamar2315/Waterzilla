module.exports= (sequelize,DataTypes)=>{
    const Bottle= sequelize.define("Bottle", {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        size:{
            type: DataTypes.STRING,
            allowNull:false
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Bottle.associate=(models)=>{
        Bottle.belongsTo(models.Company);
        Bottle.hasMany(models.Orders);
        Bottle.hasMany(models.Reviews);
    };
    return Bottle;
}
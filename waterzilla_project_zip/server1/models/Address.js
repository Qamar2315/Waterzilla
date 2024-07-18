module.exports= (sequelize,DataTypes)=>{
    const Address= sequelize.define("Address", {
        houseNo:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        streetNo:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        city:{
            type: DataTypes.STRING,
            allowNull:false
        },
        zipCode:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });
    Address.associate=(models)=>{
        Address.hasMany(models.Orders);
    };
    return Address;
}
module.exports= (sequelize,DataTypes)=>{
    const Website= sequelize.define("Website", {
        aboutUs:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    return Website;
}
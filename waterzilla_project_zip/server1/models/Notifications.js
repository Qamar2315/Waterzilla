module.exports= (sequelize,DataTypes)=>{
    const Notifications= sequelize.define("Notifications", {
        notification:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Notifications.associate=(models)=>{
        Notifications.belongsTo(models.Admin);
    };
    return Notifications;
}
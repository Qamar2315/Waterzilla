module.exports= (sequelize,DataTypes)=>{
    const Admin= sequelize.define("Admin",{
        role:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Admin.associate=(models)=>{
        Admin.hasOne(models.Website,{
            onDelete:"cascade",
        });
        Admin.hasMany(models.Notifications,{
            onDelete:"cascade",
        });
        Admin.belongsTo(models.Users);
    };
    return Admin;
}
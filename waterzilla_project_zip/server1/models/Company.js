module.exports= (sequelize,DataTypes)=>{
    const Company= sequelize.define("Company", {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        logo:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Company.associate=(models)=>{
        Company.hasOne(models.Bottle,{
            onDelete:"cascade",
        });
    };
    return Company;
}
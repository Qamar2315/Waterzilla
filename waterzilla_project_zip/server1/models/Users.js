module.exports= (sequelize,DataTypes)=>{
    const Users= sequelize.define("Users", {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        gender:{
            type: DataTypes.STRING,
            allowNull:false
        },
        cnic:{
            type: DataTypes.BIGINT,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type: DataTypes.BIGINT,
            allowNull:false
        }
    });
    Users.associate=(models)=>{
        Users.hasOne(models.Account,{
            onDelete:"cascade",
        });
        Users.hasOne(models.Address,{
            onDelete:"cascade",
        });
    };
    return Users;
}
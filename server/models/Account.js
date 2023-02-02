module.exports= (sequelize,DataTypes)=>{
    const Account= sequelize.define("Account", {
        username:{
            type: DataTypes.STRING,
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    return Account;
}
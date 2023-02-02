module.exports= (sequelize,DataTypes)=>{
    const Customer= sequelize.define("Customer", {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        profilePic:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });
    Customer.associate=(models)=>{
        Customer.hasMany(models.Orders,{
            onDelete:"cascade",
        });
        Customer.hasMany(models.Reviews,{
            onDelete:"cascade",
        });
        Customer.hasOne(models.Cart,{
            onDelete:"cascade",
        });
        Customer.hasOne(models.Users,{
            onDelete:"cascade",
        });
    };
    return Customer;
}
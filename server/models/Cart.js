module.exports= (sequelize,DataTypes)=>{
    const Cart= sequelize.define("Cart");
    Cart.associate=(models)=>{
        Cart.belongsTo(models.Customer);
        Cart.hasMany(models.Bottle);
    };
    return Cart;
}
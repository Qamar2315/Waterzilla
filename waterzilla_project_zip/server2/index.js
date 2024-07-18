const express= require('express');
const app= express();
const cors= require("cors");
const admin= require('./routes/Admin');
const waterbottle= require('./routes/Waterbottle');
const company=require('./routes/Company')
const pages=require('./routes/Pages')
const notifications=require('./routes/Notifications')
const orders=require('./routes/Orders')
const customers=require('./routes/Customers')
const reports=require('./routes/Reports')
const cart=require('./routes/Cart')
const reviews=require('./routes/Reviews')
const mongoose=require('mongoose')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/admin',admin);
app.use('/checkout',cart);
app.use('/reviews',reviews);
app.use('/admin/dashboard/waterbottle',waterbottle);
app.use('/admin/dashboard/company',company);
app.use('/admin/dashboard/pages',pages);
app.use('/admin/dashboard/notifications',notifications);
app.use('/admin/dashboard/orders',orders);
app.use('/admin/dashboard/customers',customers);
app.use('/admin/dashboard/reports',reports);

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/waterzilla');
  console.log("connected");
}

//server
app.listen(8080,()=>{
    console.log("APP IS LISTENING ON PORT 8080");
})

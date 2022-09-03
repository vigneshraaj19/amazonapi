
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const User=require('./Users');
const stripe=require("stripe")
('sk_test_51LJalQSI39jpT9zPPC01Am4ZJNWjLS4WG3o9RiKavtcxXua32N85U0uRfId9x56Kmb42nFSWuzZIjsgDNaoqjhkh001jDYYkwe')
require('dotenv').config();
//app config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// - API routes

// const MONGO_URL=process.env.MONGO_URL;
// mongoose.connect(`mongodb+srv://vigneshraaj:Vigneshraaj@cluster0.88srkn0.mongodb.net/product?retryWrites=true&w=majority`,() =>{
//   console.log("connected to database successfully");
// });

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser:true},
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
  }
);

app.post('/create',async(req,res) =>{
  try {
    const {title, price, rating, image} = req.body;
    console.log(req.body);
    const id = await User.create({title, price, rating, image});
    res.status(201).json(id)
}catch (err) {
console.log(err);
    res.status(400).json("error"); 
}
})

//   const createdata=new User({
//     title:req.body.title, 
//     price:req.body.price,
//     rating:req.body.rating,
//     image:req.body.image
//   });
//   const result=await createdata.save();
//   res.send(result);
// })

app.get('/product',async(req,res) =>{
          const data = await User.find();
           res.json(data);
          // res.send("vigneshraaj");
})

app.get("/", (request, response) => response.status(200).send("hello world vicky"));



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));



app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved  for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "inr",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });

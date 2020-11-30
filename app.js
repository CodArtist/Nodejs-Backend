const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary') 
require("./users")


cloudinary.config({
    cloud_name:"harsh2001",
    api_key:"575713664169232",
    api_secret:"S08ozAr0id3dld5orTaM85iYPD0"
})
app.use(bodyParser.json())
const Users= mongoose.model("users")

const mongouri ="mongodb+srv://harshjain:Harsh2001@cluster0.zgd8u.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongoose")
})

mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})

app.get('/getdata',(req,res)=>{
    var querypara = req.query
    console.log(querypara)
    //res.send(querypara)
    Users.findOne(querypara).then(data=>{
        console.log(data)
        res.send(data.Picture)
    }).catch(err=>{
        console.log(err)
    })
    
})


app.get('/getall',(req,res)=>{
    Users.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})


app.post('/update',(req,res)=>{
    Users.findOneAndUpdate({Name:req.body.Name}, {Picture:req.body.Picture},(error,data)=>{
        if(error){
            
            console.log(error)
        }else{
            cloudinary.v2.uploader.destroy(data.Picture.split("/")[7].split(".")[0], function(error,result) {
  console.log(result, error) })
            
            
        }
    }
    
)})

app.post('/send',(req,res)=>{

    const user = new Users({
      Name:req.body.Name,
      mobileno:req.body.mobileno,
      product:req.body.product,
      brand:req.body.brand,
      modelno:req.body.modelno,
      issue:req.body.issue,
      estimateammount:req.body.estimateammount,
      status:req.body.status,
      entrytime:req.body.entrytime
    })
    user.save().then((data)=>{
        console.log(data)
        res.send(data)
        
    }).catch((err)=>{
        console.log("Error",err)
    })

})

app.post('/delete',(req,res)=>{
    Users.findByIdAndRemove(req.body.id).then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
})

app.listen(3000,()=>{
    console.log("server started")
})
const mongoose=require("mongoose")
const Schema = new mongoose.Schema({
      Name:String,
      mobileno:String,
      product:String,
      brand:String,
      modelno:String,
      issue:String,
      estimateammount:String,
      status:String,
      entrytime:String

})

mongoose.model("users",Schema)

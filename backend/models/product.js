import mongoose from "mongoose";

const productSchema = mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
 description:{
    type:String,
    required:true
 },
 price:{
    type:Number,
    required:true,
 },
 stock:{
    type:Number,
    default:0,

 },
 image:{
    type:String,
       default:"https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_1280.png"
 },
 category:{
    type:String,
    required:true
 }
}, {
    timestamps:true
})

export default mongoose.model('Product', productSchema);
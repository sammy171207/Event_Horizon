import mongoose from "mongoose";

const bookScheme=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    event:{type:mongoose.Schema.Types.ObjectId,ref:"Event",required:true},
    seatNumber:{type:Number,required:true},
    totalamount:{type:Number,required:true},
    status:{type:String,enum:["pending","confirmed","cancelled"],required:true},
    paymentId:{type:String},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Booking',bookScheme);    

import mongoose from 'mongoose'; 

const UserScheme=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['organizer','user','admin'],
        default:'user'
    }
})

export default mongoose.model('User',UserScheme);
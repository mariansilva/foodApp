import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://marian1996silva:Marian*1996@cluster0.oawdhr8.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gpreetsaini2703:15102703@cluster0.fzidxvm.mongodb.net/food-del').then (()=>console.log("DB Connected"));
}


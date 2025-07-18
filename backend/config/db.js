import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://latishsalunkhe8:Resume123@cluster0.ml8nlo7.mongodb.net/RESUME")
    .then(() => console.log("DB connected"))
    
}
import mongoose from "mongoose";


export const dbConection = async () => {
    try{
        await mongoose.connect('mongodb+srv://santip300:river963+@santiagoperez.bpz5lsc.mongodb.net/ecommerce');
        console.log("base de datos online");
    }catch (error){
        console.log(`error al levantar la base de datos ${error}`);
        process.exit(1); //para que no se ejecute la app si la base de datos tiro un error 
    }
}
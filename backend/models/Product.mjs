import mongoose from "mongoose";
import { Category } from "./Category.mjs";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
});
export const Product = mongoose.model('Product',productSchema)
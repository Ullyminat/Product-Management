import mongoose from "mongoose";
import { Product } from "./Product.mjs";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
});

categorySchema.pre('findOneAndDelete', async function(next) {
    await Product.deleteMany({category: this._conditions._id});
    next();
});

export const Category = mongoose.model('Category',categorySchema)
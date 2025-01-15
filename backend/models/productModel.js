import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    discription: {type: String, required: true},
    price : {type: Number, required: true},
    image : {type: Array, required: true},
    catagory: {type: String, required: true},
    subCatagory: {type: String, required: true},
    sizes: {type: Array, reqired: true},
    bestseller: {type: Boolean},
    date: {type: Number, required: true}
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;


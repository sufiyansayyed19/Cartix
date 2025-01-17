import {v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';


// function for list product
const listProducts = async (req, res) =>{
    try {
        const products = await productModel.find({});
        return res.status(200).json({success: true, products})
    } catch (error){
        console.log("Error: ",error);
        res.status(500).json({success:false, message: error.message})
    }
}


// function for removing product 
const addProduct = async (req, res) =>{
    // due to multer we have req.files also
    // req.body contains text data and req.files contains file data
    
    try{
        
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        
        // catching each image
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // console.log(name, description, price, category, subCategory, sizes, bestSeller);
        // console.log(image1,image2,image3,image4);

        // making array of uploded image and also removing non uploaded or to say undefined   
        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map( async(item) => {
                let result = await cloudinary.uploader.upload(item.path, {resoure_type: 'image'});
                return result.secure_url;
            })
        )

        // console.log(imagesUrl);
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === 'ture' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save();
        
        return res.status(201).json({success:true, message:"Product Added" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({success:false, message: error.message});
    }
    
}

// function for single product 

const removeProduct = async (req, res) =>{
    try{
        // no need to find and delete seperately since we are going to by clicking existing products, we can go by findByIdAndDelete
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true, message: "Product removed"})
    } catch (error){
        console.log("Error: ", error);
        res.status(500).json({success:false, message: error.message});
    }
}


// fucntion for filling a product info
const singleProduct = async (req, res) => {
    try{
        console.log(req.body);
        const { productId } = req.body;
        console.log(productId)
        const product = await productModel.findById(productId);
        return res.status(200).json({success:true, product});

    } catch (error){
        console.log("Error: ", error);
        return res.status(500).json({success:false, message: error.message});
    }

}


export { listProducts, addProduct, removeProduct, singleProduct }
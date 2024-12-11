const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title : String, metaTitle : String, metaDescription : String, longDescription1 : String,index: Number,heading1:String,heading2:String,longDescription2:String

});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

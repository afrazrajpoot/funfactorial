const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title : String, metaTitle : String, metaDescription : String, longDescription : String,index: Number

});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

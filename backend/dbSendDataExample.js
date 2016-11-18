const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const assert = require('assert');


//TODO Make it vary in function of the program config file
//mongodb://username:password@host:port/database?options...
mongoose.connect('mongodb://drago:123456.@dragomitch.me:27017/dbdrago');

var productSchema= new Schema({
    department: String,
    productName: String,
    product: String,
    price: String, //TODO We really want a String there ?
    tva: Number,
    category: String
});

productSchema.methods.getDepartment= () => { return this.department };
productSchema.methods.getProductName= () => { return this.productName};
productSchema.methods.getProduct= () => { return this.product};
productSchema.methods.getPrice= () => { return this.price};
productSchema.methods.getTva= () => { return this.tva};
productSchema.methods.getCategory= () => { return this.category};

var productModel = mongoose.model('Products', productSchema);
/**
 * Functions added to the methods property of a schema get compiled
 * into the Model prototype and exposed on each document instance:
 */

var aProduct = new productModel({
    id: 17145,
    department: "Awesome",
    productName: "Awesome Wooden Sausages",
    product: "Bacon",
    price: "902.00",
    tva: 90862,
    category: "accusamus"
});

/**
 * Data sent to DB
 */
var promise = aProduct.save();

promise.then(function(){
    console.log("inserted");
}).catch(function(e){
    console.log("Rejected");
});

productModel.findOne({department:"Awesome"}).then( (res) => {
    console.log(res);
}).catch( (error) =>  {
    console.log("error " +error)
});


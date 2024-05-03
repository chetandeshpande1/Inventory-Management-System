import path from 'path';
import ProductModel from '../models/product.model.js';

export default class productController{
    
    getProducts(req, res){
        let products  = ProductModel.get();
        // console.log(products);

        // to use ejs 
        res.render('products',  { products: products, userEmail: req.session.userEmail }) // used as key value pair / it can also be used only as products:
        // res.render('products', { products })
        
        // commenting to avoid use of hard coded from html page
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
    }

    getAddForm(req,res){
        return res.render('new-product',{errorMessage: null, userEmail: req.session.userEmail});
    }

    addNewProduct(req, res, next){
        const { name, desc, price } = req.body;
        const imageUrl = "images/" + req.file.filename;
        //access data send from form
        // console.log(req.body);
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.get();
        res.render('products', {products: products, userEmail: req.session.userEmail})
    }

    getUpdateProductView(req, res, next){
        //1. if product exist return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            return res.render('update-product', { product: productFound, errorMessage: null, userEmail: req.session.userEmail });
        }
        //2. else return errors
        else{
            return res.status(401).send("Product not found");
        }
    }

    //update the product(retriving the data in text boxes and updating it)

    // before
    // postUpdateProduct(req, res){
    //     const id = req.params.id;
    //     const { name, desc, price } = req.body;
    //     const imageUrl = req.file ? "images/" + req.file.filename : null;

    //     ProductModel.update(id, name, desc, price, imageUrl);
    //     let products = ProductModel.get();
    //     res.render('products', {products: products})
    // }

    //after
    // this is final
    postUpdateProduct(req, res, next) {
        // const id = req.params.id;
        const { id, name, desc, price } = req.body;
        // const imageUrl = req.file ? "public/images/" + req.file.filename : null;
        const imageUrl = "images/" + req.file.filename;
        ProductModel.update(id, name, desc, price, imageUrl);
        const products = ProductModel.get();
        res.render('products', { products, userEmail: req.session.userEmail });
      }

    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }

        ProductModel.delete(id);
        let products = ProductModel.get();
        res.render('products', {products: products});
    }
}
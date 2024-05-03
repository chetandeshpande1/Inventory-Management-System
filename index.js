// const express = require('express'); comman JS syntax
import express from 'express'; //ES6 syntax
import UserController from './src/controllers/user.controller.js';
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts'; 
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
 
const server = express();


server.use(express.static('public'));
server.use(cookieParser());
// server.use(setLastVisit)
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))

// parse form data 
server.use(express.urlencoded({extended: true}));

// setup view engine setting
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);


// creating instance of productController
const productController = new ProductController();
const UsersController = new UserController();

server.get('/register',UsersController.getRegister)     // registration page
server.get('/login', UsersController.getLogin)          // login page
server.post('/login', UsersController.postLogin);
server.get('/logout', UsersController.logout);
server.post('/register', UsersController.postRegister );      // after doing registration going to login page(form submission)
server.get('/', setLastVisit, auth, productController.getProducts);
server.get('/new', auth, productController.getAddForm);
server.post('/', auth, uploadFile.single('imageUrl'), validationMiddleware, productController.addNewProduct);
server.get('/update-product/:id', auth, uploadFile.single('imageUrl'), productController.getUpdateProductView);
server.post('/update-product', auth,  uploadFile.single('imageUrl'), productController.postUpdateProduct);

server.post('/delete-product/:id', auth, productController.deleteProduct)


server.use(express.static('src/views'))

server.listen(3400, () => {
    console.log('Server is listening at 3400');
})
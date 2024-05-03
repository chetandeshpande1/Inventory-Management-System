
export default class ProductModel{
    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

    static get(){

        return products;
    }

    static add(name, desc, price, imageUrl){
        let newproduct = new ProductModel(
            products.length+1,
            name,
            desc,
            price,
            imageUrl
            );
            
            products.push(newproduct);
    }

    // before
    // static update(productObj){
    //     const index = products.findIndex((p) => p.id == productObj.id);
    //     products[index] = productObj;   
    // }

    // after
    static update(id, name, desc, price, imageUrl) {
        const index = products.findIndex((p) => p.id === parseInt(id));
        if (index !== -1) {
          products[index].name = name;
          products[index].desc = desc;
          products[index].price = price;
          if (imageUrl) {
            products[index].imageUrl = imageUrl;
          }
        }
      }


    static getById(id){
        return products.find((p) => p.id == id);
    }

    static delete(id){
        const index = products.findIndex((p) => p.id == id);
        products.splice(index, 1);
    }

}

var products = [
    new ProductModel(1, 'Product 1', 'Description of product 1 is that we can exchange html with ejs', 19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2, 'Product 2', 'Description of product 2', 19.99, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3, 'Product 3', 'Description of product 3', 19.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
    new ProductModel(4, 'Product 4', 'Description of product 4', 19.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
];


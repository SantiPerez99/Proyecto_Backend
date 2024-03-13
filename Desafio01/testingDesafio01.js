import ProducManager from "./desafioEntregable01.js";

const producto = new ProducManager();
//const fs = require('fs');
import fs from 'fs'

console.log(producto.addProduct('asus','pc',10000,'https://asuspc.com','xax1456',10 ));
console.log(producto.addProduct('macBook','pc',15000,'https://macBook.com','xax1789',5 ));
console.log(producto.addProduct('macBook','pc',15000,'https://macBook.com','xax1799',5 ));



// console.log(producto.getProducts());
// console.log(producto.getProductbyId(1));

// console.log(producto.deleteProduct(3));

const ActualizarProducto = {
    
        "price": 15000,
        "stock": 5
    
}

console.log(producto.updateProduct(1, ActualizarProducto));
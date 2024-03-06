import ProducManager from "./desafioEntregable01.js";

const producto = new ProducManager();



console.log(producto.addProduct('asus','pc',10000,'https://asuspc.com','xax1456',10 ));
console.log(producto.addProduct('macBook','pc',15000,'https://macBook.com','xax1789',5 ));
console.log(producto.getProducts());
// console.log(producto.getProductbyId(1));
import fs from 'fs'
import ProductManager from './ProductManager.js';

export default class CartManager {

    #carts
    #path;
    static idproducto = 0;
    

    constructor(){

        this.#path = "./src/data/cart.json";

        this.#carts = this.buscarCart();
    }
    IdCartAgregado(){
        let id = 1
        if(this.#carts.length != 0)
            id = this.#carts[this.#carts.length - 1].id + 1;
        return id;
        
    }
    buscarCart(){  
        try{
            if(fs.existsSync(this.#path)){  // pregunto si el archivo existe en path que es el json
                return JSON.parse(fs.readFileSync(this.#path,'utf-8'))  // si existe lo parsea 
            }

            return [];  // si no existe muestra un array vacio 

        } catch (error) {
            console.log(`ocurrio un error al buscar el Carrito, ${error}`);
        }
    }
    guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts, null, 4)); // null y 4 hacen que el array se vea de forma separada y una abajo del otro
            console.log('Archivo guardado exitosamente.');
        } catch (error) {
            console.log(`Ocurrió un error al guardar el carrito: ${error}`);
        }
    }
    createCart(){
        const newCart ={
            id: this.IdCartAgregado(),
            products:[]
        }; 
        this.#carts.push(newCart);
        this.guardarArchivo();

        return newCart
    }
    getCartbyId (id){
        // debe buscar el prod segun id en el array
        // de no coincidir debe devolver "not found"
        const producto = this.#carts.find(producto => producto.id == id); // esta variable busca en el array y se fija si hay coincidencia 
        if(producto)
            return producto 
        else 
             return `Not Found del producto ${id}`  // si no se encuentra la variable retorna not found           
    }  
    addProductInCart(cid, pid){

        let request = `el carrito con id ${cid} no existe..!!`;
        const indexCart = this.#carts.findIndex(c=> c.id===cid);
        if(indexCart !== -1){

            const indexProductInCart = this.#carts[indexCart].products.findIndex(p=> p.id === pid);
            const p = new ProductManager();
            const producto = p.getProductbyId(pid); 

            if(producto.status && indexProductInCart === -1){
                this.#carts[indexCart].products.push({ id: pid, 'quantity': 1 });
                this.guardarArchivo();
                request='producto agregado al carrito';
            }else if (producto.status && indexProductInCart !== -1){
                ++this.#carts[indexCart].products[indexProductInCart].quantity;
                this.guardarArchivo();
                request='producto agregado al carrito';
            }else{
                request = `el producto con id ${pid} no existe..!!`;
            }
            
        };
        return request
    }  
}

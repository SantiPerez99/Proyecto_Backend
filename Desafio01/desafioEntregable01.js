
//const fs = require('fs');
import fs from 'fs'

export default class ProducManager {

    #products
    #path;
    static idproducto = 0;
    

    constructor(){

        this.#path = '../data/productos.json';
        this.#products = this.buscarProductos();
    }
    IdproductoAgregado(){
        let id = 1
        if(this.#products.length != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
        
    }
    buscarProductos(){  
        try{
            if(fs.existsSync(this.#path)){  // pregunto si el archivo existe en path que es el json
                return JSON.parse(fs.readFileSync(this.#path,'utf-8'))  // si existe lo parsea 
            }

            return [];  // si no existe muestra un array vacio 

        } catch (error) {
            console.log(`ocurrio un error al buscar los productos, ${error}`);
        }
    }
    guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, 4)); // null y 4 hacen que el array se vea de forma separada y una abajo del otro
            console.log('Archivo guardado exitosamente.');
        } catch (error) {
            console.log(`Ocurrió un error al guardar el producto: ${error}`);
        }
    }
    
    addProduct( title, description, price, thumbnail, code, stock ){
        
       if(!title || !description || !price || !thumbnail || !code || !stock)
            return "todos los parametros son requeridos [title, description, price, thumbnail, code, stock]"


        // validar que no se repita el codigo 

       const repetido = this.#products.some(producto => producto.code == code)
        if(repetido)
            return `el codigo ${code} ya se encuentra registrado en otro producto`;


        // id autoincrementar
        ProducManager.idproducto++;
        const id = this.IdproductoAgregado();
        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(nuevoProducto);
        this.guardarArchivo();
        return "producto agregado con exito!"
    }

    getProducts (){
        //devolver todos los productos 
        return this.#products;
    }

    getProductbyId (id){
        // debe buscar el prod segun id en el array
        // de no coincidir debe devolver "not found"
        const producto = this.#products.find(producto => producto.id == id); // esta variable busca en el array y se fija si hay coincidencia 
        if(producto)
            return producto 
        else 
             return `Not Found del producto ${id}`  // si no se encuentra la variable retorna not found           
    }

    updateProduct(id, object) {
        let mensajeError = `EL producto con id ${id} no existe`
        let mensajeUpdate = `El producto con id ${id} fue actualizado con existo...!!! `
        const index = this.#products.findIndex(p=> p.id === id);

        if(index >= 0){
            const {id, ...rest} = object
            this.#products[index] = {...this.#products[index], ...rest} //sobre un producto (this.#products[index]) aplica las nuevas modificaciones  {...this.#products[index], ...rest}
            this.guardarArchivo()
            return mensajeUpdate
        }
        return mensajeError
    }
    
    deleteProduct(id){
        let mensajeError = `EL producto con id ${id} no existe`
        let mensajeEliminado = `El producto con id ${id} fue eliminado correctamente...!!!`
        const index = this.#products.findIndex(p=> p.id === id);
        if(index !== -1 ){
            this.#products = this.#products.filter(p=> p.id !== id); // filtra todos los elementos del array MENOS el elemento que recibe por id. 
            this.guardarArchivo();   // guardo el nuevo archivo con el elemento eliminado
            return mensajeEliminado;
        }
        return mensajeError;

    }



}





//const fs = require('fs');
import fs, { stat } from 'fs'

export default class ProductManager {

    #products
    #path;
    static idproducto = 0;
    

    constructor(){

        this.#path = "./src/data/productos.json";

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
    
    addProduct( title, description, price, thumbnails = [], code, stock, category, status=true ){

        let result = 'Ocurrio un error'
        
       if(!title || !description || !price || !code || !stock || !category)
            result = "todos los parametros son requeridos [title, description, price, code, stock, category]"
        else {
            // validar que no se repita el codigo 

            const repetido = this.#products.some(producto => producto.code == code)
            
            if(repetido)
                result = `el codigo ${code} ya se encuentra registrado en otro producto`;
            else{
                    // id autoincrementar
                ProductManager.idproducto++;
                const id = this.IdproductoAgregado();
                const nuevoProducto = {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    category,
                    status
                };
                this.#products.push(nuevoProducto);
                this.guardarArchivo();
                result = {
                    msg : 'Producto agregado exitosamente..!!',
                    producto : nuevoProducto
                };
            }
        }

        return result 
    }

    getProducts (limit = 0){
        limit = Number(limit); //parce limit a number 
        if(limit > 0)
            return this.#products.slice(0,limit);
        //devolver todos los productos 
        return this.#products;
    }

    getProductbyId (id){
        // debe buscar el prod segun id en el array
        // de no coincidir debe devolver "not found"
        let status = false;
        let resp = `el producto con id ${id} no existe..!!`;

        const producto = this.#products.find(producto => producto.id == id); // esta variable busca en el array y se fija si hay coincidencia 
        if(producto){

            status=true;
            resp=producto
        }
            
        return {status , resp}         
    }

    updateProduct(id, object) {

        let result = `EL producto con id ${id} no existe`

        const index = this.#products.findIndex(p=> p.id === id);

        if(index >= 0){
            const {id, ...rest} = object
            const propsAllowed = ['title', 'description','price','thumbnails','code','stock','category','status'];
            const propsUpdate = Object.keys(rest)
                .filter(prop => propsAllowed.includes(prop))
                .reduce((obj,key)=>{
                    obj[key]= rest[key]; 
                    return obj;  // valido que no se actualice una propiedad que no corresponde 
                }, {});  
            this.#products[index] = {...this.#products[index], ...propsUpdate } //sobre un producto (this.#products[index]) aplica las nuevas modificaciones  {...this.#products[index], ...rest}
            this.guardarArchivo()
            result = {
                msg : 'Producto actualizado con exito..!!',
                result: this.#products[index]
            }
        }
        return result
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




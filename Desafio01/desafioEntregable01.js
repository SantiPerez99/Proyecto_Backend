

export default class ProducManager {

    #products
    static idproducto = 0;

    constructor(){
        this.#products = []
    }

    addProduct( title, description, price, thumbnail, code, stock ){
        
       if(!title || !description || !price || !thumbnail || !code || !stock)
            return "todos los parametros son requeridos [title, description, price, thumbnail, code, stock]"


        // validar que no se repita el codigo 

       const repetido = this.#products.some(producto => producto.code == code)
        if(repetido)
            return `el codigo ${code} ya se encuentra registrado en otro producto`;


        // id autoincrementar
        ProducManager.idproducto = ProducManager.idproducto +1
        const id = ProducManager.idproducto;
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
}




import  express  from "express";
import {Server, Socket} from 'socket.io';
import {engine} from 'express-handlebars';

import productsRouter from './routers/productsRouter.js'
import cartsRouter from './routers/cartsRouter.js'
import views from './routers/views.js';
import __dirname from "./utils.js";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const p = new ProductManager();

app.use(express.json())   // sirve para enviar peticiones a traves de formularios html 
app.use(express.urlencoded({ extended: true})) // traducir la data en texto leible 
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); 


app.use('/',views);
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);


const expressServer = app.listen(PORT,()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});
const socketServer = new Server(expressServer);

socketServer.on('connection',socket => {
    const productos = p.getProducts();
    socket.emit('productos', productos)

    socket.on('agregarProducto',producto=>{
        const result = p.addProduct({...producto});
        if(result.producto)
        socket.emit('productos', result.producto);
    })
});



import  express  from "express";
import {Server, Socket} from 'socket.io';
import {engine} from 'express-handlebars';

import productsRouter from './routers/productsRouter.js'
import cartsRouter from './routers/cartsRouter.js'
import views from './routers/views.js';
import __dirname from "./utils.js";

import { dbConection } from "./database/config.js";
import { productModel } from "./models/products.js";
import { messageModel } from "./models/messages.js";

const app = express();
const PORT = 8080;


app.use(express.json())   // sirve para enviar peticiones a traves de formularios html 
app.use(express.urlencoded({ extended: true})) // traducir la data en texto leible 
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); 


app.use('/',views);
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

await dbConection();

const expressServer = app.listen(PORT,()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});
const io = new Server(expressServer);

io.on('connection',async (socket) => {

    //products
    
    const productos = await productModel.find();
    socket.emit('productos', productos)

    socket.on('agregarProducto',async (producto)=>{
        const newProduct = await productModel.create({...producto});
        if(newProduct){
            productos.push(newProduct)
            socket.emit('productos', productos);
        }
    });

    // Chat messages 

    const messages = await messageModel.find();
    socket.emit('message', messages);

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({...data});
        if(newMessage){
            const messages = await messageModel.find();
            io.emit('messageLogs',messages )
        }
    });
    socket.broadcast.emit('nuevo_user')
});



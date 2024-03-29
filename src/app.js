import  express  from "express";
import productsRouter from './routers/productsRouter.js'
import cartsRouter from './routers/cartsRouter.js'



const app = express();
const PORT = 8080;

app.use(express.json())   // sirve para enviar peticiones a traves de formularios html 
app.use(express.urlencoded({ extended: true})) // traducir la data en texto leible 

app.get('/',(req,res) =>{
    return res.send ('preEntrega 1')
})

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);


app.listen(PORT,()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});


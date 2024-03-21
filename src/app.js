import  express  from "express";
import ProductManager from "./ProductManager.js";




const app = express();
const PORT = 8080;

app.get('/products', (req, res) => {
    const { limit } = req.query;
    const p = new ProductManager();
    return res.json({ productos: p.getProducts(Number(limit)) }); // Convertir limit a número
});

app.get('/products/:pid', (req, res)=>{
    const {pid} = req.params;
    const p = new ProductManager();

    return res.json({producto:p.getProductbyId(Number(pid))});
})


app.listen(PORT,()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});
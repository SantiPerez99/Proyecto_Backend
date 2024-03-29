import { Router } from "express";
import CartManager from "../CartManager.js";


const router = Router();

router.post('/',(req,res)=>{
    const c = new CartManager();
    const result = c.createCart();
    return res.json({result});

})

router.post('/:cid/product/:pid',(req,res)=>{
    const {cid,pid} = req.params;
    const c = new CartManager();
    const result = c.addProductInCart(Number(cid), Number(pid));
    return res.json({result});

})

router.get('/:cid',(req,res)=>{
    const {cid} = req.params;
    const c = new CartManager();
    const result = c.getCartbyId(Number(cid));
    return res.json({result});
    
})

export default router;
import { Router } from "express";
import { getCartbyId, createCart, addProductInCart } from "../controllers/carts.js";


const router = Router();

router.post('/',createCart)

router.post('/:cid/product/:pid',addProductInCart)

router.get('/:cid',getCartbyId)

export default router;
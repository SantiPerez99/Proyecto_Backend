import { request, response } from "express";
import { CartModel } from "../models/carts.js";

export const getCartbyId =async(req=request, res=response) => {
    try{
        const {cid} = req.params;
        const carrito = await CartModel.findById(cid);

        if(carrito)
            return res.json({carrito});

        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
        
    } catch(error){
        console.log('deleteProduct - ', error);
        return res.status(500).json({msg:'Comunicarse con un administrador'});
    } 
}
export const createCart =async(req=request, res=response) => {
    try{
        const carrito = await CartModel.create({});
        return res.json({msg:`carrito creado`, carrito});

        } catch(error){
        console.log('deleteProduct - ', error);
        return res.status(500).json({msg:'Comunicarse con un administrador'});
    } 
}
export const addProductInCart =async(req=request, res=response) => {
    try{
            const {cid,pid} = req.params;
            const carrito = await CartModel.findById(cid);

            if(!carrito)
                return res.status(404).json({msg:`el carrito con id ${cid} no existe`})
            
            const productoInCart = carrito.products.find(p=>p.id.toString() === pid);
            if(productoInCart)
                productoInCart.quantity++;
            else    
                carrito.products.push({id:pid, quantity :1});
            carrito.save();
            
            return res.json({msg: `carrito actualizado`,carrito});
            
        } catch(error){
            console.log('addProductInCart - ', error);
            return res.status(500).json({msg:'Comunicarse con un administrador'});
    } 
}


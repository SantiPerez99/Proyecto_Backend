import {Schema, model  } from 'mongoose';

const nameCollection = 'Producto';

const ProductoSchema = new Schema({

    title:{type:String, required:[true,"el title del producto es obligatorio"]},
    description:{type:String, required:[true,"La description del producto es obligatoria"]},
    price:{type:Number, required:[true,"el price del producto es obligatorio"]},
    thumbnails:[{type: String}],
    code:{type:String, required:[true,"el codigo del producto es obligatorio"],unique:true},
    stock:{type:String, required:[true,"el stock del producto es obligatorio"]},
    category:{type:String, required:[true,"el category del producto es obligatorio"]},
    status:{type:Boolean, default: true},

});

ProductoSchema.set('toJSON',{   //para eliminar la propiedad __V en en la base de datos de mongo
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})
export const productModel = model(nameCollection, ProductoSchema);

import {Schema, model  } from 'mongoose';

const nameCollection = 'Cart';

const CartSchema = new Schema({
    products:[
        {
            _id:false,
            id:{
                type:Schema.Types.ObjectId,
                ref:'Producto'
            },
            quantity:{
                type:Number,
                required:[true,"la cantidad del producto es obligatoria"]
            }
        }
    ]

});
CartSchema.set('toJSON',{   //para eliminar la propiedad __V en en la base de datos de mongo
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

export const CartModel = model(nameCollection, CartSchema);

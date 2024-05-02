import {Schema, model  } from 'mongoose';

const nameCollection = 'Message';

const MessageSchema = new Schema({
    user:{type:String, required:[true,'el nombre del usuario es obligatorio']},
    message:{type:String, required:[true,'el mensage es obligatorio']}
});

export const messageModel = model(nameCollection, MessageSchema);

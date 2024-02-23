import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},

}, {timestamps: true})

const Product = model('Product', ProductSchema)

export default  Product
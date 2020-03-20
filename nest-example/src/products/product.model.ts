import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true}
});

export interface Product extends mongoose.Document{
    id: string;
    title: string;
    description: string;
    price: number;

    // constructor(id: string, title: string, desc: string, price: number) {
    //     this.id = id;
    //     this.title = title;
    //     this.description = desc;
    //     this.price = price;
    // };

    //constructor(public id: string, public title: string,public desc: string,public price: number) {};
}
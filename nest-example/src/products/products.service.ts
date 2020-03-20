import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
    products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        }
        catch {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }

        return product;
    }

    async insertProduct(title: string, desc: string, price: number): Promise<string> {
        const newProduct = new this.productModel({title: title, description: desc, price: price});
        const result = await newProduct.save();

        return result.id as string;
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products.map(x => ({
            id: x.id,
            title: x.title,
            description: x.description,
            price: x.price
        })) as Product[];
    }

    async getProduct(prodId: string): Promise<Product> {
        const product = await this.findProduct(prodId);

        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        } as Product;
    }

    async updateProduct(prodId, title, desc, price) {
        const updatedProduct = await this.findProduct(prodId);

        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save()
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if(result.n === 0){
            throw new NotFoundException('Could not find product');
        }
    }
}
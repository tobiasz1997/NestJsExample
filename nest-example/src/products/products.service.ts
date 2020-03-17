import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    products: Product[] = [];

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not find product');
        }

        return [product, productIndex];
    }

    insertProduct(title: string, desc: string, price: number): string {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);

        return prodId;
    }

    getProducts() {
        return [...this.products]
    }

    getProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];

        return { ...product };
    }

    updateProduct(prodId, title, desc, price) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const [product, index] = this.findProduct(prodId);
        this.products.splice(index,1);
    }
}
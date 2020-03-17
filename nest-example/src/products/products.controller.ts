import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    addProduct(
        //@Body() completeBody: {title: string, description: string, price: number}
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);

        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return null;
    }


}
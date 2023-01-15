import { Product } from "../product";
import { IPricingRule } from "./IPricingRule";

export class BulkFlatPricingRule implements IPricingRule {
    constructor(
        private paidProduct: Product,
        private bulkQty: number, // Threshold for determining if discount is valid
        private discount: number,
    ) {};

    calculateDiscountOnProductList(products: Product[]): number {
        const applicableProducts = products.filter((product) => product.sku == this.paidProduct.sku);
    
        // Does the quantity of products mean a discount is coming??
        return applicableProducts.length >= this.bulkQty ? this.discount : 0;
    }
}

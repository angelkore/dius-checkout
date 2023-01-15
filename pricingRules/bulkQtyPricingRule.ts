import { Product } from "../product";
import { IPricingRule } from "./IPricingRule";


export class BulkQtyDiscountRule implements IPricingRule {
    constructor(
        private paidProduct: Product,
        private bulkQty: number // Threshold for determining if discount is valid
    ) {};

    calculateDiscountOnProductList(products: Product[]): number {
        const applicableProducts = products.filter((product) => product.sku == this.paidProduct.sku);
        
        const discountTotal = this.paidProduct.price;

        // Does the quantity of products mean a discount is coming??
        // TODO: What if we buy 6 Apple TV's? Do we get two for free, or just one?
        return applicableProducts.length >= this.bulkQty ? discountTotal : 0;
    }
}

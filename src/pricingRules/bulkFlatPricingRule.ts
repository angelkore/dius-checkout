import { Product } from "../product";
import { IPricingRule } from "./IPricingRule";

export class BulkFlatPricingRule implements IPricingRule {
    constructor(
        private paidProduct: Product,
        private bulkQty: number, // Threshold for determining if discount is valid
        private discountedPrice: number,
    ) {
        // FIXME: This ain't in the spec technically, but it probably should be...
        // if (paidProduct.price <= discountedPrice) {
        //     throw new Error("Can't have a discount larger than the price of the product itself dummy")
        // }
    };

    calculateDiscountOnProductList(products: Product[]): number {
        const applicableProducts = products.filter((product) => product.sku == this.paidProduct.sku);
        
        let discount = 0;

        // Is there enough products here to modify the price?
        if (applicableProducts.length > this.bulkQty) {
            const priceDelta: number = this.paidProduct.price - this.discountedPrice;
            discount = priceDelta * applicableProducts.length;
        }

        return discount;
    }
}

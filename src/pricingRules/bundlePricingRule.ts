import { Product } from "../product";
import { IPricingRule } from "./IPricingRule";


export class BundlePricingRule implements IPricingRule {
    constructor(
        private paidProduct: Product,
        private freeProduct: Product
    ) {};

    calculateDiscountOnProductList(products: Product[]): number {
        const applicablePaidProducts = products.filter((product) => product.sku == this.paidProduct.sku);
        const applicableFreeProducts = products.filter((product) => product.sku == this.freeProduct.sku);

        const baseDiscountAmount = this.freeProduct.price;

        // If we have multiple paid and free products, this will account for the amount of discounts to be applied
        // E.G if 3 paid products and 2 free products in cart, will return 2*discount
        const discountTotal = Math.min(applicableFreeProducts.length, applicablePaidProducts.length) * baseDiscountAmount;

        return discountTotal;
    }
}

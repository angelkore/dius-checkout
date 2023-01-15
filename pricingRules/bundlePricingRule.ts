import { Product } from "../product";
import { IPricingRule } from "./IPricingRule";


export class BundlePricingRule implements IPricingRule {
    constructor(
        private paidProduct: Product,
        private freeProduct: Product
    ) {};

    calculateDiscountOnProductList(products: Product[]): number {
        const paidProductFound: boolean = products.indexOf(this.paidProduct) > -1;
        const freeProductFound: boolean = products.indexOf(this.freeProduct) > -1;

        const discountTotal = this.freeProduct.price;

        return (paidProductFound && freeProductFound) ? discountTotal : 0;
    }
}

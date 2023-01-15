import { IPricingRule } from "./pricingRules/IPricingRule";
import { Product } from "./product";

export class Checkout {
    private pricingRules: Array<IPricingRule> = [];
    private scannedProducts: Array<Product> = [];

    constructor(pricingRules: Array<IPricingRule>) {
        this.pricingRules = pricingRules;
    }

    total(): number {
        let total: number = 0;
        this.scannedProducts.forEach((product) => {
            total += product.price;
        })

        return total;
    }

    scan(product: Product) {
        this.scannedProducts.push(product);
        // TODO: Maybe apply pricing rules here? Or do we work out discounts at total()? 
    }
}
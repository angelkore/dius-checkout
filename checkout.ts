import { PricingRule } from "./pricingRule";
import { Product } from "./product";

export class Checkout {
    private pricingRules: Array<PricingRule>;
    private scannedProducts: Array<Product>;

    constructor(pricingRules: Array<object>) {
        this.pricingRules = pricingRules;
    }

    // TODO: Make this do stuff
    total() {}

    scan(product: Product) {
        this.scannedProducts.push(product);
        // TODO: Maybe apply pricing rules here? Or do we work out discounts at total()? 
    }
}
import { IPricingRule } from "./pricingRules/IPricingRule";
import { Product } from "./product";

export class Checkout {
    private pricingRules: Array<IPricingRule> = [];
    private scannedProducts: Array<Product> = [];

    constructor(pricingRules: Array<IPricingRule> = []) {
        this.pricingRules = pricingRules;
    }

    public setPricingRules(pricingRules: IPricingRule[]) {
        // TODO: Should probably check there's no duplicates in this array, else double discounts for everybody
        this.pricingRules = pricingRules;
    }
    
    // Work out the total discount applicable in the cart
    private discount(): number {
        let totalDiscount: number = 0;

        this.pricingRules.forEach((rule) => {
            totalDiscount += rule.calculateDiscountOnProductList(this.scannedProducts);
        })

        return totalDiscount;
    }

    // Gets value for all prices in cart
    private subtotal(): number {
        let total: number = 0;
        this.scannedProducts.forEach((product) => {
            total += product.price;
        })

        return total;
    }

    // Finalized price including discounts
    public total(): number {
        return this.subtotal() - this.discount();
    }

    public clear() {
        this.scannedProducts = [];
    }

    public scan(product: Product) {
        this.scannedProducts.push(product);
    }
}
import { IPricingRule } from "./pricingRules/IPricingRule";
import { Product } from "./product";

export class Checkout {
    private pricingRules: Array<IPricingRule> = [];
    private scannedProducts: Array<Product> = [];

    constructor(pricingRules: Array<IPricingRule> = []) {
        this.pricingRules = pricingRules;
    }

    setPricingRules(pricingRules: IPricingRule[]) {
        this.pricingRules = pricingRules;
    }
    
    // Work out the total applicable in the cart
    discount(): number {
        let totalDiscount: number = 0;

        this.pricingRules.forEach((rule) => {
            totalDiscount += rule.calculateDiscountOnProductList(this.scannedProducts);
        })

        return totalDiscount;
    }

    // Gets value for all prices in cart
    subtotal(): number {
        let total: number = 0;
        this.scannedProducts.forEach((product) => {
            total += product.price;
        })

        return total;
    }

    // Finalized price including discounts
    total(): number {
        return this.subtotal() - this.discount();
    }

    scan(product: Product) {
        this.scannedProducts.push(product);
    }
}
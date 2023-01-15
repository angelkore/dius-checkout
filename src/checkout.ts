import { IPricingRule } from "./pricingRules/IPricingRule";
import { Product } from "./product";

export class Checkout {
    private pricingRules: Array<IPricingRule> = [];
    private scannedProducts: Array<Product> = [];

    public setPricingRules(pricingRules: IPricingRule[]) {
        // TODO: Should probably check there's no duplicates in this array, else double discounts for everybody
        this.pricingRules = pricingRules;
    }
    
    // Work out the total discount applicable in the cart
    private getDiscount(): number {
        let totalDiscount: number = 0;

        this.pricingRules.forEach((rule) => {
            totalDiscount += rule.calculateDiscountOnProductList(this.scannedProducts);
        })

        return totalDiscount;
    }

    // Gets value for all prices in cart
    private getSubtotal(): number {
        let total: number = 0;
        this.scannedProducts.forEach((product) => {
            total += product.price;
        })

        return total;
    }

    // Finalized price including discounts
    public getTotal(): number {
        return this.getSubtotal() - this.getDiscount();
    }

    public clear() {
        this.scannedProducts = [];
    }

    public scan(product: Product) {
        this.scannedProducts.push(product);
    }

    public getScannedProducts(): Product[] {
        return this.scannedProducts;
    }
}
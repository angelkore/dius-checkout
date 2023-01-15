import { describe, expect, it } from "@jest/globals";
import { Product } from "./product";
import { Checkout } from "./checkout";
import { PricingRule } from "./pricingRule";

let testProducts: Product[] = [
    new Product("ipd", "Super iPad", 549.99),
    new Product("mbp", "MacBook Pro", 1399.99),
    new Product("atv", "Apple TV", 109.50),
    new Product("vga", "VGA Adapter", 30.00),
]

const testPricingRules: PricingRule[] = [];

const checkout: Checkout = new Checkout(testPricingRules);

describe("checkout", () => {
    it("should give the correct price for a checkout", () => {
        const expectedTotal: number = testProducts[0].price + testProducts[1].price;
        
        checkout.scan(testProducts[0]);
        checkout.scan(testProducts[1]);

        expect(checkout.total()).toEqual(expectedTotal)
    })
})
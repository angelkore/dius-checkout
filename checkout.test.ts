import { describe, expect, it, beforeEach } from "@jest/globals";
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

let checkout: Checkout;

beforeEach(() => {
    checkout = new Checkout(testPricingRules);
})

describe("checkout", () => {
    it("should give the correct price for a checkout", () => {
        const expectedTotal: number = testProducts[0].price + testProducts[1].price;
        
        checkout.scan(testProducts[0]);
        checkout.scan(testProducts[1]);

        expect(checkout.total()).toEqual(expectedTotal)
    })

    it("should give the correct price for multiple scanned items", () => {
        const testProduct = testProducts[0];

        const expectedTotal: number = testProduct.price * 3;

        checkout.scan(testProduct);
        checkout.scan(testProduct);
        checkout.scan(testProduct);

        expect(checkout.total()).toEqual(expectedTotal);
    })
})
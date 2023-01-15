import { describe, expect, it, beforeEach } from "@jest/globals";
import { Product } from "../product";
import { Checkout } from "../checkout";
import { IPricingRule } from "../pricingRules/IPricingRule";
import { TEST_PRODUCTS } from "./utils";
import { BulkPricingRule } from "../pricingRules/BulkPricingRule";

let testProducts: Product[] = TEST_PRODUCTS;

let checkout: Checkout;

beforeEach(() => {
    checkout = new Checkout([]);
})

describe("checkout", () => {
    describe("no pricing rules", () => {
        it("should give the correct price for a checkout", () => {
            const expectedTotal: number = testProducts[0].price + testProducts[1].price;
            
            checkout.scan(testProducts[0]);
            checkout.scan(testProducts[1]);
    
            expect(checkout.total()).toEqual(expectedTotal)
        })
    
        it("should give the correct price for multiple scanned products", () => {
            const testProduct = testProducts[0];
    
            // Add 3 of the same to the checkout
            const expectedTotal: number = testProduct.price * 3;
    
            checkout.scan(testProduct);
            checkout.scan(testProduct);
            checkout.scan(testProduct);
    
            expect(checkout.total()).toEqual(expectedTotal);
        })
    
        
        it("should give the correct price for multiple scanned products and another product", () => {
            const testProduct1 = testProducts[0];
            const testProduct2 = testProducts[2];
    
            // Add 3 of the same to the checkout
            const expectedTotal: number = testProduct1.price * 3 + testProduct2.price;
    
            checkout.scan(testProduct1);
            checkout.scan(testProduct1);
            checkout.scan(testProduct1);
            checkout.scan(testProduct2)
    
            expect(checkout.total()).toEqual(expectedTotal);
        })
    })
    
    describe("with pricing rules", () => {
        const bulkProduct = testProducts[0];
        const bulkQty = 3;
        const bulkPricingRule = new BulkPricingRule(bulkProduct, bulkQty);
        
        it("should return correct total with bulk pricing rule applied", () => {     
            checkout.setPricingRules([bulkPricingRule]);
       
            const expectedTotal: number = bulkProduct.price * 2;
    
            checkout.scan(bulkProduct);
            checkout.scan(bulkProduct);
            checkout.scan(bulkProduct);
    
            expect(checkout.total()).toEqual(expectedTotal);
        })
    })
})
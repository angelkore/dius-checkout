import { describe, expect, it, beforeEach } from "@jest/globals";
import { Product } from "../product";
import { Checkout } from "../checkout";
import { TEST_PRODUCTS } from "./utils";
import { BulkQtyDiscountRule } from "../pricingRules/bulkQtyDiscountRule";
import { BulkFlatDiscountRule } from "../pricingRules/bulkFlatDiscountRule";

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
        const bulkQtyProduct = testProducts[0];
        const bulkFlatProduct = testProducts[1];

        const bulkQty = 3;
        const qtyPricingRule = new BulkQtyDiscountRule(bulkQtyProduct, bulkQty);
        
        const flatDiscountValue = 123;
        const flatQty = 3;
        const flatPricingRule = new BulkFlatDiscountRule(bulkFlatProduct, flatQty, flatDiscountValue);

        describe("bulk qty", () => {
            beforeEach(() => {
                checkout.setPricingRules([qtyPricingRule]);
            })

            it("should return correct total with qty pricing rule applied", () => {                
                const expectedTotal: number = bulkQtyProduct.price * 2;
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);
            })
    
            it("should return correct total with qty pricing rule applied, but not enough applicable products in cart to meet rule", () => {                
                const expectedTotal: number = bulkQtyProduct.price;
        
                checkout.scan(bulkQtyProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);
            })
        })
        
        
        describe("bulk flat", () => {
            beforeEach(() => {
                checkout.setPricingRules([flatPricingRule]);
            })

            it("should return correct total with flat pricing rule applied", () => {     
                const expectedTotal: number = bulkFlatProduct.price * 3 - flatDiscountValue;
        
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);
            })
    
            it("should return correct total with flat pricing rule applied, but not enough applicable products in cart to meet rule", () => {                
                const expectedTotal: number = bulkFlatProduct.price;
        
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);
            })
        })

        describe("multiple rules", () => {
            beforeEach(() => {
                checkout.setPricingRules([flatPricingRule, qtyPricingRule]);
            })

            it("should return correct total for both qty and flat pricing applied with applicable products", () => {     
                const expectedTotal: number = 
                    bulkQtyProduct.price * 3 + bulkFlatProduct.price * 3
                    - flatDiscountValue // For Flat discount
                    - bulkQtyProduct.price // for Qty Discount
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);
            })
    
            it("should return correct total for both qty and flat pricing applied, but only enough for flat discount", () => {                
                const expectedTotal: number = 
                    bulkQtyProduct.price * 2 + bulkFlatProduct.price * 3
                    - flatDiscountValue // For Flat discount
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);            
            })

            it("should return correct total for both qty and flat pricing applied, but only enough for qty discount", () => {                
                const expectedTotal: number = 
                    bulkQtyProduct.price * 3 + bulkFlatProduct.price * 2
                    - bulkQtyProduct.price // for Qty Discount
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.total()).toEqual(expectedTotal);            
            })
        })
    })
})
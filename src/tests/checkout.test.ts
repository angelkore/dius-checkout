import { describe, expect, it, beforeEach } from "@jest/globals";
import { Product } from "../product";
import { TEST_PRODUCTS } from "../utils";
import { BulkQtyPricingRule } from "../pricingRules/bulkQtyPricingRule";
import { BulkFlatPricingRule } from "../pricingRules/bulkFlatPricingRule";
import { BundlePricingRule } from "../pricingRules/bundlePricingRule";
import { Checkout } from "../checkout";

let testProducts: Product[] = TEST_PRODUCTS;

let checkout: Checkout;

beforeEach(() => {
    checkout = new Checkout();
})

describe("checkout", () => {
    it("should add products to the checkout when scanned", () => {
        checkout.scan(testProducts[0]);

        expect(checkout.getScannedProducts()).toEqual([testProducts[0]]);
    })

    it("should return all scanned items when get calling", () => {
        checkout.scan(testProducts[0]);
        checkout.scan(testProducts[1]);
        checkout.scan(testProducts[2]);
        checkout.scan(testProducts[1]);

        expect(checkout.getScannedProducts()).toEqual([testProducts[0], testProducts[1], testProducts[2], testProducts[1]]);
    })

    it("should remove existing products when cleared", () => {
        checkout.scan(testProducts[0]);
        checkout.scan(testProducts[0]);
        checkout.scan(testProducts[0]);

        checkout.clear();

        expect(checkout.getScannedProducts()).toEqual([]);
    })

    describe("no pricing rules", () => {
        it("should give the correct price for a checkout", () => {
            const expectedTotal: number = testProducts[0].price + testProducts[1].price;
            
            checkout.scan(testProducts[0]);
            checkout.scan(testProducts[1]);
    
            expect(checkout.getTotal()).toEqual(expectedTotal)
        })
    
        it("should give the correct price for multiple scanned products", () => {
            const testProduct = testProducts[0];
    
            // Add 3 of the same to the checkout
            const expectedTotal: number = testProduct.price * 3;
    
            checkout.scan(testProduct);
            checkout.scan(testProduct);
            checkout.scan(testProduct);
    
            expect(checkout.getTotal()).toEqual(expectedTotal);
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
    
            expect(checkout.getTotal()).toEqual(expectedTotal);
        })
    })
    
    describe("with pricing rules", () => {
        const bulkQtyProduct = testProducts[0];
        const bulkFlatProduct = testProducts[1];

        const bundlePaidProduct = testProducts[2];
        const bundleFreeProduct = testProducts[3];

        const bulkQty = 3;
        const qtyPricingRule = new BulkQtyPricingRule(bulkQtyProduct, bulkQty);
        
        const flatDiscountValue = 123;
        const flatQty = 2;
        const flatPricingRule = new BulkFlatPricingRule(bulkFlatProduct, flatQty, flatDiscountValue);

        const bundlePricingRule = new BundlePricingRule(bundlePaidProduct, bundleFreeProduct);

        describe("bulk qty", () => {
            beforeEach(() => {
                checkout.setPricingRules([qtyPricingRule]);
            })

            it("should return correct total with qty pricing rule applied", () => {                
                const expectedTotal: number = bulkQtyProduct.price * 2;
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
    
            it("should return correct total with qty pricing rule applied, but not enough applicable products in cart to meet rule", () => {                
                const expectedTotal: number = bulkQtyProduct.price;
        
                checkout.scan(bulkQtyProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
        })
        
        
        describe("bulk flat", () => {
            beforeEach(() => {
                checkout.setPricingRules([flatPricingRule]);
            })

            it("should return correct total with flat pricing rule applied", () => {     
                const expectedTotal: number = flatDiscountValue * 3;
        
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
    
            it("should return correct total with flat pricing rule applied, but not enough applicable products in cart to meet rule", () => {                
                const expectedTotal: number = bulkFlatProduct.price;
        
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
        })

        describe("bundle", () => {
            beforeEach(() => {
                checkout.setPricingRules([bundlePricingRule]);
            })

            it("should return correct total with bundle pricing rule applied", () => {     
                const expectedTotal: number = bundlePaidProduct.price ;
        
                checkout.scan(bundlePaidProduct);
                checkout.scan(bundleFreeProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
        })


        describe("multiple rules", () => {
            beforeEach(() => {
                checkout.setPricingRules([flatPricingRule, qtyPricingRule, bundlePricingRule]);
            })

            it("should return correct total for both qty and flat pricing applied with applicable products", () => {     
                const expectedTotal: number = 
                    bulkQtyProduct.price * 3
                    + flatDiscountValue * 3 // For Flat price rule
                    - bulkQtyProduct.price // for Qty price rule
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);
            })
    
            it("should return correct total for both qty and flat pricing applied, but only enough for flat price rule", () => {                
                const expectedTotal: number = 
                    bulkQtyProduct.price * 2 +
                    flatDiscountValue * 3 // For Flat price rule
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);            
            })

            it("should return correct total for both qty and flat pricing applied, but only enough for qty price rule", () => {                
                const expectedTotal: number = 
                    bulkQtyProduct.price * 3 + bulkFlatProduct.price * 2
                    - bulkQtyProduct.price // for Qty price rule
        
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkQtyProduct);
                checkout.scan(bulkFlatProduct);
                checkout.scan(bulkFlatProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);            
            })

            it("should return correct total with bundle price rule applied", () => {                
                const expectedTotal: number = bundlePaidProduct.price;
        
                checkout.scan(bundlePaidProduct);
                checkout.scan(bundleFreeProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);            
            })

            // TODO: Should this scenario be valid? Multiple price rules in one go? Would ask for a better scope probs
            it("should return correct total with bulk price rule, with product also being a part of a free bundle price rule", () => { 
                const newFlatRule = new BulkQtyPricingRule(bundlePaidProduct, 3); 
                const newBundleRule = new BundlePricingRule(bundlePaidProduct, bundleFreeProduct);               
              
                checkout.setPricingRules([newFlatRule, newBundleRule]);

                const expectedTotal: number = bundlePaidProduct.price * 2;
                
                checkout.scan(bundlePaidProduct);
                checkout.scan(bundlePaidProduct);
                checkout.scan(bundlePaidProduct);
                checkout.scan(bundleFreeProduct);
        
                expect(checkout.getTotal()).toEqual(expectedTotal);            
            })
        })
    })
})
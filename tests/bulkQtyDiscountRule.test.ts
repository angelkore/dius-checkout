import { describe, expect, it } from "@jest/globals";
import { Product } from "../product";
import { TEST_PRODUCTS } from "./utils";
import { BulkQtyDiscountRule } from "../pricingRules/bulkQtyPricingRule";
import { IPricingRule } from "../pricingRules/IPricingRule";

const BULK_PRODUCT = TEST_PRODUCTS[0];
const OTHER_PRODUCT = TEST_PRODUCTS[1];

const PRICING_RULE: IPricingRule = new BulkQtyDiscountRule(BULK_PRODUCT, 3);

describe("pricing rule - bulk qty", () => {
    it("should give a discount of 0 if not enough items are in the checkout cart", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);
    })

    it("should give a discount of the product's value if enough are added to cart", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT,
            BULK_PRODUCT,        
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(BULK_PRODUCT.price);
    })

    it("should only give a single discount if there are many of the same product added", () => {
        const testCart: Product[] = [];

        for (let count = 0; count < 999; count++) {
            testCart.push(BULK_PRODUCT);
        }

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(BULK_PRODUCT.price);
    })

    it("should give a discount if the cart has enough for the rule, plus other items", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT,
            BULK_PRODUCT, 
            OTHER_PRODUCT,
            OTHER_PRODUCT       
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(BULK_PRODUCT.price);
    })
})
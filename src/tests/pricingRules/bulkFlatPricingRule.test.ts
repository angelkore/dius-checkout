import { describe, expect, it } from "@jest/globals";
import { Product } from "../../product";
import { TEST_PRODUCTS } from "../../utils";
import { IPricingRule } from "../../pricingRules/IPricingRule";
import { BulkFlatPricingRule } from "../../pricingRules/bulkFlatPricingRule";

const BULK_PRODUCT = TEST_PRODUCTS[0];
const OTHER_PRODUCT = TEST_PRODUCTS[1];

const DISCOUNT_QTY = 2;
const DISCOUNTED_PRICE = 123;

const PRICING_RULE: IPricingRule = new BulkFlatPricingRule(BULK_PRODUCT, DISCOUNT_QTY, DISCOUNTED_PRICE);

describe("pricing rule - bulk flat", () => {
    it("should give a discount of 0 if not enough items are in the checkout cart", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);
    })

    it("should give a discount of the discount value if enough are added to cart", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT,
            BULK_PRODUCT,        
        ]

        const expectedTotal = (BULK_PRODUCT.price - DISCOUNTED_PRICE) * 3;

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedTotal);
    })

    it("should only give a single discount if there are many of the same product added", () => {
        const testCart: Product[] = [];

        for (let count = 0; count < 999; count++) {
            testCart.push(BULK_PRODUCT);
        }

        const expectedTotal = (BULK_PRODUCT.price - DISCOUNTED_PRICE) * 999;

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedTotal);
    })

    it("should give a discount if the cart has enough for the rule, plus other items", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT,
            BULK_PRODUCT, 
            OTHER_PRODUCT,
            OTHER_PRODUCT       
        ]

        const expectedTotal = (BULK_PRODUCT.price - DISCOUNTED_PRICE) * 3;

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedTotal);
    })
})
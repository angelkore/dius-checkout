import { describe, expect, it } from "@jest/globals";
import { Product } from "../product";
import { TEST_PRODUCTS } from "./utils";
import { IPricingRule } from "../pricingRules/IPricingRule";
import { BulkFlatDiscountRule } from "../pricingRules/bulkFlatPricingRule";

const BULK_PRODUCT = TEST_PRODUCTS[0];
const OTHER_PRODUCT = TEST_PRODUCTS[1];

const DISCOUNT_QTY = 3;
const DISCOUNT_VALUE = 123;

const PRICING_RULE: IPricingRule = new BulkFlatDiscountRule(BULK_PRODUCT, DISCOUNT_QTY, DISCOUNT_VALUE);

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

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(DISCOUNT_VALUE);
    })

    it("should only give a single discount if there are many of the same product added", () => {
        const testCart: Product[] = [];

        for (let count = 0; count < 999; count++) {
            testCart.push(BULK_PRODUCT);
        }

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(DISCOUNT_VALUE);
    })

    it("should give a discount if the cart has enough for the rule, plus other items", () => {
        const testCart: Product[] = [
            BULK_PRODUCT,
            BULK_PRODUCT,
            BULK_PRODUCT, 
            OTHER_PRODUCT,
            OTHER_PRODUCT       
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(DISCOUNT_VALUE);
    })
})
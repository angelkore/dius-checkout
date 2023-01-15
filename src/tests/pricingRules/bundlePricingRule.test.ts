import { describe, expect, it } from "@jest/globals";
import { IPricingRule } from "../../pricingRules/IPricingRule";
import { BundlePricingRule } from "../../pricingRules/bundlePricingRule";
import { Product } from "../../product";
import { TEST_PRODUCTS } from "../../utils";

const PAID_PRODUCT = TEST_PRODUCTS[0];
const FREE_PRODUCT = TEST_PRODUCTS[1];
const OTHER_PRODUCT = TEST_PRODUCTS[2];

const PRICING_RULE: IPricingRule = new BundlePricingRule(PAID_PRODUCT, FREE_PRODUCT);

describe("pricing rule - bundle qty", () => {
    it("should give a discount of 0 if only the paid product is in the cart", () => {
        let testCart: Product[] = [
            PAID_PRODUCT,
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);

        testCart = [
            PAID_PRODUCT,
            OTHER_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);
    })

    it("should give a discount of 0 if only the free product is in the cart", () => {
        let testCart: Product[] = [
            FREE_PRODUCT,
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);

        testCart = [
            FREE_PRODUCT,
            OTHER_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(0);
    })

    it("should give a discount of free product's value if both paid and free are in the cart", () => {
        const expectedDiscount = FREE_PRODUCT.price;

        let testCart: Product[] = [
            PAID_PRODUCT,
            FREE_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedDiscount);

        testCart = [
            PAID_PRODUCT,
            FREE_PRODUCT,
            OTHER_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedDiscount);
    })

    it("should give a 2x discount if two paid and two free products are in cart", () => {
        const expectedDiscount = FREE_PRODUCT.price * 2;

        let testCart: Product[] = [
            PAID_PRODUCT,
            PAID_PRODUCT,
            FREE_PRODUCT,
            FREE_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedDiscount);
    })

    it("should give a 2x discount if three paid and two free products are in cart", () => {
        const expectedDiscount = FREE_PRODUCT.price * 2;

        let testCart: Product[] = [
            PAID_PRODUCT,
            PAID_PRODUCT,
            PAID_PRODUCT,
            FREE_PRODUCT,
            FREE_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedDiscount);
    })

    it("should give a 2x discount if two paid and three free products are in cart", () => {
        const expectedDiscount = FREE_PRODUCT.price * 2;

        let testCart: Product[] = [
            PAID_PRODUCT,
            PAID_PRODUCT,
            FREE_PRODUCT,
            FREE_PRODUCT,
            FREE_PRODUCT
        ]

        expect(PRICING_RULE.calculateDiscountOnProductList(testCart)).toEqual(expectedDiscount);
    })
})
import { Product } from "../product";

export interface IPricingRule {
    calculateDiscountOnProductList(products: Product[]): number;
}


import { Product } from "./product";

export const TEST_PRODUCTS: Product[] = [
    new Product("ipd", "Super iPad", 54999),
    new Product("mbp", "MacBook Pro", 139999),
    new Product("atv", "Apple TV", 10950),
    new Product("vga", "VGA Adapter", 3000),
]

export function formatNumberToCurrency(total: number) {
    return Intl.NumberFormat('en-US', {style: 'currency', currency: 'target currency'})
    .format(total);  
}
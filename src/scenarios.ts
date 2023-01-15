import { Checkout } from "./checkout";
import { BulkFlatPricingRule } from "./pricingRules/bulkFlatPricingRule";
import { BulkQtyPricingRule } from "./pricingRules/bulkQtyPricingRule";
import { BundlePricingRule } from "./pricingRules/bundlePricingRule";
import { Product } from "./product";
import { formatNumberToCurrency } from "./utils";

const ipd: Product = new Product("ipd", "Super iPad", 54999);
const mbp: Product = new Product("mbp", "MacBook Pro", 139999);
const atv: Product = new Product("atv", "Apple TV", 10950);
const vga: Product = new Product("vga", "VGA Adapter", 3000);

const checkout = new Checkout();

// Add all our starting specials
const tvDeal = new BulkQtyPricingRule(atv, 3);
const ipadDeal = new BulkFlatPricingRule(ipd, 4, 49999);
const vgaDeal = new BundlePricingRule(mbp, vga);

checkout.setPricingRules([tvDeal, ipadDeal, vgaDeal]);

// Now, lets run through some real scenarios!

// Scenario 1
checkout.scan(atv);
checkout.scan(atv);
checkout.scan(atv);
checkout.scan(vga);
console.log(`Total price for Scenario 1 = ${formatNumberToCurrency(checkout.total())} - expected Value = $249.00`);
checkout.clear();

// Scenario 2
checkout.scan(atv);
checkout.scan(ipd);
checkout.scan(ipd);
checkout.scan(atv);
checkout.scan(ipd);
checkout.scan(ipd);
checkout.scan(ipd);
console.log(`Total price for Scenario 2 = ${formatNumberToCurrency(checkout.total())} - expected Value = $2718.95`);
checkout.clear();

// Scenario 3
checkout.scan(mbp);
checkout.scan(vga);
checkout.scan(ipd);
console.log(`Total price for Scenario 3 = ${formatNumberToCurrency(checkout.total())} - expected Value = $1949.98`);
checkout.clear();



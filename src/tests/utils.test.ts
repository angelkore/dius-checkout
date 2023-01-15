import { describe, expect, it } from "@jest/globals";
import { formatNumberToCurrency } from "../utils";

describe("utils", () => {
    it("should convert cents into formatted currency string", () => {
        expect(formatNumberToCurrency(12345)).toEqual("$123.45");
    })
});
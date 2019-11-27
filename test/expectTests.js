const chai = require("chai");
const expect = chai.expect;
chai.use(require("../index"));

describe("Chai-PDF Plugin using Expect", () => {
    it("Should be able to verify same PDF", async () => {
        await expect("same.pdf").to.be.samePdfAs("baseline.pdf");
    });

    it("Should be able to verify same PDF with Masking", async () => {
        await expect("maskedSame.pdf").to.be.samePdfAs("baseline.pdf", {
            masks: [{ pageIndex: 1, coordinates: { x0: 35, y0: 70, x1: 145, y1: 95 } }]
        });
    });

    it("Should be able to verify not same PDF", async () => {
        await expect("notSame").to.not.be.samePdfAs("baseline");
    });

    it("Should be able to verify not same PDF with Masking", async () => {
        await expect("maskedNotSame").to.not.be.samePdfAs("baseline", {
            masks: [
                { pageIndex: 1, coordinates: { x0: 35, y0: 70, x1: 145, y1: 95 } },
                { pageIndex: 1, coordinates: { x0: 185, y0: 70, x1: 285, y1: 95 } }
            ]
        });
    });
});

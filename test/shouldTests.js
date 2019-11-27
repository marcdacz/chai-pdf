const chai = require("chai");
const should = chai.should();
chai.use(require("../index"));

describe("Chai-PDF Plugin using Should", () => {
    it("Should be able to verify same PDF", async () => {
        let actualFileName = "same.pdf";
        let baselineFileName = "baseline.pdf";
        await actualFileName.should.be.samePdfAs(baselineFileName);
    });

    it("Should be able to verify same PDF with Masking", async () => {
        let actualFileName = "maskedSame.pdf";
        let baselineFileName = "baseline.pdf";
        let options = {
            masks: [{ pageIndex: 1, coordinates: { x0: 35, y0: 70, x1: 145, y1: 95 } }]
        };
        await actualFileName.should.be.samePdfAs(baselineFileName, options);
    });

    it("Should be able to verify not same PDF", async () => {
        let actualFileName = "notSame.pdf";
        let baselineFileName = "baseline.pdf";
        await actualFileName.should.not.be.samePdfAs(baselineFileName);
    });

    it("Should be able to verify not same PDF with Masking", async () => {
        let actualFileName = "maskedNotSame.pdf";
        let baselineFileName = "baseline.pdf";
        let options = {
            masks: [{ pageIndex: 1, coordinates: { x0: 35, y0: 70, x1: 145, y1: 95 } }]
        };
        await actualFileName.should.not.be.samePdfAs(baselineFileName);
    });
});

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
chai.use(require("../src/chaiPdf"));

describe("Chai-PDF Plugin", () => {
    it("Should be able to verify same PDF", async () => {
        await expect("same.pdf").to.be.samePdfAs("baseline.pdf");
    });

    it("Should be able to verify not same PDF", async () => {
        await expect("notSame").to.not.be.samePdfAs("baseline.pdf");
    });
});

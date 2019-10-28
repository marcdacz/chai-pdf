const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
chai.use(require("../src/chaiPdf"));

describe("Chai-PDF Plugin", () => {
    it("Should be able to compare PDF", async () => {
        await expect("actualPdf").to.be.samePdfAs("baselinePdf.pdf");
    });
});

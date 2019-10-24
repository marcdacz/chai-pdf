const chai = require("chai");
const chaiPdf = require("../src/chaiPdf");
const expect = chai.expect;
chai.use(chaiPdf);

describe("Chai-PDF Plugin", () => {
    it("Should be able to compare PDF", async () => {
        expect("pdfs").to.be.samePdfAs("pdfss");
    });
});

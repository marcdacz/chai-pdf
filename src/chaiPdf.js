module.exports = function(chai, utils) {
    const Assertion = chai.Assertion;

    Assertion.addMethod("samePdfAs", function(expectedPdfFileName) {
        var actualPdfFileName = this._obj;
        this.assert(
            actualPdfFileName === expectedPdfFileName,
            "expected #{this} to be of type #{exp} but got #{act}",
            "expected #{this} to not be of type #{act}",
            expectedPdfFileName,
            actualPdfFileName
        );
    });
};

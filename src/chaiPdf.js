const fs = require("fs-extra");
const path = require("path");
const gm = require("gm").subClass({ imageMagick: true });
const looksSame = require("looks-same");

const config = {
    paths: {
        actualPdfRootFolder: process.cwd() + "/data/actualPdfs",
        baselinePdfRootFolder: process.cwd() + "/data/baselinePdfs",
        actualPngRootFolder: process.cwd() + "/data/actualPngs",
        baselinePngRootFolder: process.cwd() + "/data/baselinePngs",
        diffPngRootFolder: process.cwd() + "/data/diffPngs"
    }
};

const ensurePathExists = () => {
    fs.ensureDirSync(config.paths.actualPdfRootFolder);
    fs.ensureDirSync(config.paths.baselinePdfRootFolder);
    fs.ensureDirSync(config.paths.actualPngRootFolder);
    fs.ensureDirSync(config.paths.baselinePngRootFolder);
    fs.ensureDirSync(config.paths.diffPngRootFolder);
};

const pdfToPng = (pdfFilePath, pngFilePath) => {
    return new Promise((resolve, reject) => {
        gm(pdfFilePath)
            .density(150, 150)
            .quality(80)
            .write(pngFilePath, (err) => {
                err ? reject(err) : resolve();
            });
    });
};

const comparePngs = async (actual, baseline, diff) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(baseline)) {
            looksSame(
                baseline,
                actual,
                { strict: false, ignoreAntialiasing: true, pixelRatio: 1, tolerance: 1 },
                (error, result) => {
                    if (error) {
                        resolve({ result: "failed", actual: actual, baseline: baseline, message: error });
                    }

                    if (result && result.equal) {
                        resolve({ result: "passed", actual: actual, baseline: baseline, message: result });
                    } else {
                        looksSame.createDiff(
                            {
                                reference: baseline,
                                current: actual,
                                diff: diff,
                                highlightColor: "FFFF00",
                                strict: false,
                                ignoreAntialiasing: true,
                                pixelRatio: 1,
                                tolerance: 1
                            },
                            (diffErr) => {
                                resolve({ result: "failed", actual: actual, baseline: baseline, message: diffErr });
                            }
                        );
                    }
                }
            );
        }
    });
};

module.exports = function(chai, utils) {
    const Assertion = chai.Assertion;

    Assertion.addMethod("samePdfAs", async function(baselinePdfFileName) {
        let actualPdfFileName = this._obj;

        // Ensure Paths Exists
        ensurePathExists();

        // Ensure Pdf Exists
        const actualPdfBaseName = path.parse(actualPdfFileName).name;
        const actualPdfFilePath = `${config.paths.actualPdfRootFolder}/${actualPdfBaseName}.pdf`;
        const actualPngFilePath = `${config.paths.actualPngRootFolder}/${actualPdfBaseName}.png`;
        new Assertion(fs.pathExistsSync(actualPdfFilePath), `expected ${actualPdfBaseName} to exist`).to.be.true;

        const baselinePdfBaseName = path.parse(baselinePdfFileName).name;
        const baselinePdfFilePath = `${config.paths.baselinePdfRootFolder}/${baselinePdfBaseName}.pdf`;
        const baselinePngFilePath = `${config.paths.baselinePngRootFolder}/${baselinePdfBaseName}.png`;
        new Assertion(fs.pathExistsSync(baselinePdfFilePath), `expected ${baselinePdfBaseName} to exist`).to.be.true;

        // Convert Pdfs to Pngs
        await pdfToPng(actualPdfFilePath, actualPngFilePath);
        await pdfToPng(baselinePdfFilePath, baselinePngFilePath);

        // Get Pngs from Root Folder
        let actualPngs = fs
            .readdirSync(config.paths.actualPngRootFolder)
            .filter((pngFile) => path.parse(pngFile).name.startsWith(actualPdfBaseName));
        let baselinePngs = fs
            .readdirSync(config.paths.baselinePngRootFolder)
            .filter((pngFile) => path.parse(pngFile).name.startsWith(baselinePdfBaseName));

        // Ensure Actual and Baseline Page counts are the same
        new Assertion(
            actualPngs.length,
            `expected ${actualPdfBaseName} to have same page count as ${baselinePdfBaseName}`
        ).to.equal(baselinePngs.length);

        // Compare all Pngs and collect results
        let comparisonResults = [];
        for (let index = 0; index < baselinePngs.length; index++) {
            let actualPng = `${config.paths.actualPngRootFolder}/${actualPdfBaseName}-${index}.png`;
            let baselinePng = `${config.paths.baselinePngRootFolder}/${baselinePdfBaseName}-${index}.png`;
            let diffPng = `${config.paths.baselinePngRootFolder}/${baselinePdfBaseName}_diff-${index}.png`;
            comparisonResults.push(await comparePngs(actualPng, baselinePng, diffPng));
        }

        console.log("TCL: comparisonResults", JSON.stringify(comparisonResults));

        this.assert(
            comparisonResults.filter((res) => res.result === "failed").length === 0,
            `expected #{this} to be same pdf as #{exp}\n${JSON.stringify(comparisonResults)}`,
            `expected #{this} to not be same pdf as #{exp}`,
            baselinePdfFileName,
            actualPdfFileName
        );
    });
};

# chai-pdf

Awesome chai plugin for testing PDF files

## Usage

```
var chai = require('chai');
chai.use(require('chai-pdf'));

expect("ActualPdfFilename").to.be.samePdfAs("ExpectedPdfFilename)
```

<img src="https://avatars1.githubusercontent.com/u/1515293?s=280&v=4" height="128"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png" height="128">
# chai-pdf

Awesome chai plugin for testing PDF files

## Setup
Install [GraphicsMagick](http://www.graphicsmagick.org/README.html)
Install [ImageMagick](https://imagemagick.org/script/download.php)
Install [GhostScript](https://www.ghostscript.com/download.html)

```
npm install chai-pdf
```

## Usage

```
var chai = require('chai');
chai.use(require('chai-pdf'));

await expect("ActualPdfFilename").to.be.samePdfAs("ExpectedPdfFilename)
```

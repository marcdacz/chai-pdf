<img src="https://avatars1.githubusercontent.com/u/1515293?s=280&v=4" height="128"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png" height="128">

# chai-pdf

Awesome chai plugin for testing PDF files

## Setup

Install the following system dependencies

-   [GraphicsMagick](http://www.graphicsmagick.org/README.html)
-   [ImageMagick](https://imagemagick.org/script/download.php)
-   [GhostScript](https://www.ghostscript.com/download.html)

Install npm module

```
npm install chai-pdf
```

## Folder Structure

Place your actual and baseline pdfs inside the following folders:

-   /data/actualPdfs
-   /data/baselinePdfs

## Usage

```
var chai = require('chai');
chai.use(require('chai-pdf'));

// Compare Pdfs by just indicating their filenames (with or without extension)
await expect("ActualPdfFilename").to.be.samePdfAs("ExpectedPdfFilename")

// You can also add options such as page masking
let options = {
    masks: [
        { pageIndex: 1, coordinates: { x0: 35, y0: 70, x1: 145, y1: 95 } }
    ]
}
await expect("ActualPdfFilename.pdf").to.be.samePdfAs("ExpectedPdfFilename.pdf", options);
```

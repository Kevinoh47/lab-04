'use strict';

let index = module.exports = {};

const fs = require('fs');

const os = require('os');
console.log('big or little endian?' , os.endianness());

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

let myFile = './assets/baldy.bmp';

let myBmp = new Bitmap(myFile);

console.log('myBmp:', myBmp);

const bmpBuffer = fs.readFileSync(`${__dirname}/assets/baldy.bmp`);

console.log(bmpBuffer);

//myBmp.parse(bmpBuffer);

const parsedBitmap  = {};
// type
parsedBitmap.type = bmpBuffer.toString('utf-8', 0, 2);
// fileSize
parsedBitmap.fileSize = bmpBuffer.readInt32LE(2);
// Bytes Per Pixel //NOTE CHANGING THIS TO BITS NOT BYTES PER PIXEL, PER WIKIPEDIA.
parsedBitmap.bitsPerPixel = bmpBuffer.readInt16LE(28); //1C hex = 28
// Height
parsedBitmap.height = bmpBuffer.readInt32LE(22);
// Width
parsedBitmap.width = bmpBuffer.readInt32LE(18);

//first byte (i.e. the beginning or starting address) of the Pixel Array
// NOTE: the color palette table is directly before this one.
parsedBitmap.startOfPixelArray = bmpBuffer.readInt32LE(10);

parsedBitmap.numberOfColorPlanes = bmpBuffer.readInt16LE(26); 

parsedBitmap.numberOfColorsInPalette = bmpBuffer.readInt32LE(46);

parsedBitmap.numberOfBytesInDIBheader = bmpBuffer.readInt32LE(14);

console.log('type:', parsedBitmap.type);
console.log('fileSize:', parsedBitmap.fileSize);
console.log('bitsPerPixel:', parsedBitmap.bitsPerPixel);
console.log('height:', parsedBitmap.height);
console.log('width:', parsedBitmap.width);
console.log('first byte of pixel array:', parsedBitmap.startOfPixelArray);
console.log('count of color planes:' , parsedBitmap.numberOfColorPlanes);
console.log('number of colors in palette:', parsedBitmap.numberOfColorsInPalette);
console.log('numberOfBytesInDIBHeader:', parsedBitmap.numberOfBytesInDIBheader);
/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
//Question: why is Bitmap capitalized here? this isn't a constructor?
Bitmap.prototype.parse = function(buffer) {
  console.log('inside parser...');
  this.type = buffer.toString('utf-8', 0, 2); //why is this the file path here but correct above???
  console.log('this type: ', this.type);

  console.log('Bitmap Type', Bitmap.type);
  //... and so on
  // this.fileSize = buffer.readInt32LE(2);
  // this.bytesPerPixel = buffer.readInt16LE(28);
  // this.height = buffer.readInt32LE(22);
  // this.width = buffer.readInt32LE(18);
};

// TODO figure out how to call this parse method. Nothing i have tried has worked. either parse is said not to be a function, or the buffer is said to be undefined... 
// console.log('myBmp parsed using bmpBuffer... ', myBmp.parse(fs.readFileSync(`${__dirname}/assets/baldy.bmp`)));

//let myBitmapObject = Bitmap.call.parse(fs.readFileSync(`${__dirname}/assets/baldy.bmp`));
//let myBitmapObject = myBmp.parse(fs.readFileSync(bmpBuffer));
let myBitmapObject = myBmp.parse(`${__dirname}/assets/baldy.bmp`);

for (var key in myBitmapObject) {
  console.log(key, myBitmapObject[key]);
}


/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
// Bitmap.prototype.transform = function(operation) {
//   // This is really assumptive and unsafe
//   transforms[operation](this);
//   this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
// };

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  //TODO: alter bmp to make the image greyscale ...

};

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
// const transforms = {
//   greyscale: transformGreyscale,
// };

// ------------------ GET TO WORK ------------------- //

// function transformWithCallbacks() {

//   fs.readFile(file, (err, buffer) => {

//     if (err) {
//       throw err;
//     }

//     bitmap.parse(buffer);

//     bitmap.transform(operation);

//     // Note that this has to be nested!
//     // Also, it uses the bitmap's instance properties for the name and thew new buffer
//     fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
//       if (err) {
//         throw err;
//       }
//       console.log(`Bitmap Transformed: ${bitmap.newFile}`);
//     });

//   });
// }

// TODO: Explain how this works (in your README)
// const [file, operation] = process.argv.slice(2);

// let bitmap = new Bitmap(file);

// transformWithCallbacks();


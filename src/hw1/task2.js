import * as fs from 'node:fs';
import csvtojson from 'csvtojson';
import  { pipeline } from 'node:stream';

const readStream = fs.createReadStream('./assets/nodejs-hw1-ex1.csv');
const writeStream = fs.createWriteStream('./gen/output1.txt');
const writeStream2 = fs.createWriteStream('./gen/output2.txt');
const converter = csvtojson({ delimiter: ';' });

pipeline(
  converter.fromStream(readStream),
  writeStream,
  (err) => {
    if (err) {
      console.error('Converting failed.', err);
    } else {
      console.log('Converting succeeded.');
    }
  }
);

const main = async () => {
  try {
    const data = await converter.fromFile('./assets/nodejs-hw1-ex1.csv');
    writeStream2.write(JSON.stringify(data).slice(1, -1).replaceAll(',{', '\n{'));
    console.log('Converting succeeded.');
  } catch (err) {
    console.error('Converting failed.', err);
  }
};

main();

const fs = require('fs');
const pdf = require('pdf-parse');

async function parse() {
  try {
    let dataBuffer1 = fs.readFileSync('../Brand Identity Strategy - Ebube Agu.pdf');
    let data1 = await pdf(dataBuffer1);
    fs.writeFileSync('brand.txt', data1.text);
    console.log('Brand parsed');

    let dataBuffer2 = fs.readFileSync('../PRD - Sitemap- EbubeAgu Website.pdf');
    let data2 = await pdf(dataBuffer2);
    fs.writeFileSync('prd.txt', data2.text);
    console.log('PRD parsed');
  } catch (err) {
    console.error(err);
  }
}

parse();

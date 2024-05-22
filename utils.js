const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function convertHTMLToPPTX(templates) {
  let pptx = new PptxGenJS();

  for (const template of templates) {
    const htmlPath = path.join(__dirname, 'public', 'templates', template);
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    let slide = pptx.addSlide();
    slide.addText(htmlContent, { x: 0, y: 0, w: '100%', h: '100%' });
  }

  return pptx;
}

module.exports = { convertHTMLToPPTX };

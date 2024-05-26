const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');

const mergePptxFiles = (files) => {
  const pptx = new PptxGenJS();

  files.forEach((file) => {
    const pptxPath = path.join(__dirname, '../public/templates', file.replace('.gif', '.pptx'));
    console.log('Loading file:', pptxPath); // 로그 추가

    if (fs.existsSync(pptxPath)) {
      const fileData = fs.readFileSync(pptxPath);
      pptx.load(fileData);
    } else {
      console.error('File does not exist:', pptxPath); // 파일이 없는 경우 로그 추가
    }
  });

  const mergedPath = path.join(__dirname, 'merged.pptx');
  pptx.writeFile({ fileName: mergedPath });
  console.log('Merged file saved at:', mergedPath); // 로그 추가

  return mergedPath;
};

module.exports = mergePptxFiles;

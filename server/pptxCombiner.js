const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');
const JSZip = require('jszip');

const mergePptxFiles = async (files) => {
  console.log('Merging files:', files);

  const pptx = new PptxGenJS();

  for (const file of files) {
    const pptxPath = path.join(__dirname, '..', 'public', file.replace('.gif', '.pptx'));
    console.log('Loading file:', pptxPath);

    if (fs.existsSync(pptxPath)) {
      const pptxData = fs.readFileSync(pptxPath);
      const zip = await JSZip.loadAsync(pptxData);

      const slides = zip.folder('ppt/slides');
      const slideNames = Object.keys(slides.files).filter(name => name.startsWith('ppt/slides/slide'));

      for (const slideName of slideNames) {
        const slideData = await slides.file(slideName).async('string');
        const newSlide = pptx.addSlide();
        
        // 슬라이드 내용을 텍스트와 도형으로 추가하는 부분을 구현합니다.
        // 예제: 슬라이드에 텍스트 상자를 추가
        newSlide.addText(`Content from ${slideName}`, { x: 0.5, y: 0.5, fontSize: 18, color: '363636' });
      }
    } else {
      console.error('File does not exist:', pptxPath);
    }
  }

  const mergedPath = path.join(__dirname, 'merged.pptx');
  await pptx.writeFile({ fileName: mergedPath });
  console.log('Merged file saved at:', mergedPath);

  return mergedPath;
};

module.exports = mergePptxFiles;

import React from 'react';

const Preview = ({ template }) => {
  if (!template) {
    return <div>No template selected</div>;
  }

  const imagePath = `/templates/${template.file}`; // 절대 경로 설정

  return (
    <div className="preview-content">
      {console.log('Preview image path:', imagePath)}
      <img src={imagePath} alt={template.name} onError={(e) => console.log('Error loading image:', e)} />
    </div>
  );
};

export default Preview;

import React from 'react';

const Preview = ({ template }) => {
  return (
    <div>
      <img src={template.file} alt="Selected Template" />
    </div>
  );
};

export default Preview;

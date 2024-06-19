import React, { useState } from 'react';
import './TemplateCreator.css';

function TemplateCreator({ onCreate }) {
  const [templateName, setTemplateName] = useState('');

  const handleCreate = () => {
    const newTemplate = {
      name: templateName,
      // other template data here
    };
    onCreate(newTemplate);
    setTemplateName('');
  };

  return (
    <div className="template-creator">
      <select 
        className="template-select" 
        onChange={(e) => setTemplateName(e.target.value)} 
        value={templateName}
      >
        <option value="">선택</option>
        <option value="기본 템플릿">기본 템플릿</option>
        <option value="개요">개요</option>
        <option value="목차">목차</option>
        <option value="요약 장표">요약 장표</option>
        <option value="메인 장표">메인 장표</option>
      </select>
      <button className="create-button" onClick={handleCreate}>생성</button>
    </div>
  );
}

export default TemplateCreator;

import React, { useState } from 'react';

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
    <div>
      <select onChange={(e) => setTemplateName(e.target.value)} value={templateName}>
        <option value="">ì í</option>
        <option value="ê¸°ë³¸ ííë¦¿">ê¸°ë³¸ ííë¦¿</option>
        <option value="ê°ì">ê°ì</option>
        <option value="ëª©ì°¨">ëª©ì°¨</option>
        <option value="ìì½ ì¥í">ìì½ ì¥í</option>
        <option value="ë©ì¸ ì¥í">ë©ì¸ ì¥í</option>
      </select>
      <button onClick={handleCreate}>ìì±</button>
    </div>
  );
}

export default TemplateCreator;

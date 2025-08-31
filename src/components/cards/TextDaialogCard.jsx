import React from 'react';
import './cards.css';

/**
 * TextDaialogCard
 * Props:
 *  - name: string (speaker name/title)
 *  - text: string (dialog body text)
 */
const TextDaialogCard = ({ name, text }) => {
  return (
    <div className="text-dialog-card">
      <div className="tdc-header">
        <span className="tdc-title">{name}</span>
      </div>
      <div className="tdc-body">
        {text}
      </div>
    </div>
  );
};

export default TextDaialogCard;


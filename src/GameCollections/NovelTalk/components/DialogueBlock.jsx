import React, { forwardRef } from 'react';
import CharaPreview from './CharaPreview';
import TalkEditor from './TalkEditor';

const DialogueBlock = forwardRef(({ dialogue, character, onTextChange, onRemoveBlock, onFocus, onBlur, onCtrlEnter }, ref) => {
  return (
    <div style={{ border: '1px solid #555', padding: '10px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0 }}>
        {character && <CharaPreview character={character} size={64} />}
      </div>
      <div style={{ flexGrow: 1 }}>
        <TalkEditor
          ref={ref}
          value={dialogue.text}
          onChange={(newText) => onTextChange(dialogue.id, newText)}
          onFocus={onFocus}
          onBlur={onBlur}
          onCtrlEnter={() => onCtrlEnter(dialogue.id)}
          placeholder={`「${character ? character.name : 'キャラクターなし'}」のセリフを入力...`}
          rows={3}
        />
      </div>
      <button onClick={() => onRemoveBlock(dialogue.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        X
      </button>
    </div>
  );
});

export default DialogueBlock;
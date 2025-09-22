import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import CharaCarousel from './components/CharaCarousel';
import CharaPreview from './components/CharaPreview';
import TalkEditor from './components/TalkEditor';
import DialogueBlock from './components/DialogueBlock';
import { loadCharacters } from './components/PersistStore';
import { v4 as uuidv4 } from 'uuid';
import useKeyMapManager from './components/useKeyMapManager';
import CharacterScreen from './screens/CharacterScreen';

import './styles/NovelTalk.css';

export default function NovelTalk({ initialScenario, onSave }) {
  const [activeTab, setActiveTab] = useState('talk');
  const [characters, setCharacters] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogueBlocks, setDialogueBlocks] = useState([]);
  const [focusedEditorId, setFocusedEditorId] = useState(null);
  const [lastAddedBlockId, setLastAddedBlockId] = useState(null);

  const editorRefs = useRef(new Map());

  // Load characters on mount
  useEffect(() => {
    const loadedChars = loadCharacters();
    setCharacters(loadedChars);
    if (loadedChars.length > 0) {
      setSelectedId(loadedChars[0].id);
    }
  }, []);

  // Update selectedId if characters change and current selectedId is no longer valid
  useEffect(() => {
    if (selectedId && !characters.some(char => char.id === selectedId)) {
      setSelectedId(characters.length > 0 ? characters[0].id : null);
    }
  }, [characters, selectedId]);

  // Focus the last added editor
  useEffect(() => {
    if (lastAddedBlockId) {
      const editorToFocus = editorRefs.current.get(lastAddedBlockId);
      if (editorToFocus) {
        editorToFocus.focus();
        setLastAddedBlockId(null); // Reset to avoid refocussing
      }
    }
  }, [lastAddedBlockId]);

  const selectedChar = characters.find(c => c.id === selectedId);

  const tabs = [
    { key: 'talk', label: 'トーク' },
    { key: 'character', label: 'キャラクター' },
  ];

  const handleAddDialogueBlock = (afterBlockId = null) => {
    if (!selectedId) {
      alert('キャラクターを選択してください。');
      return;
    }
    const newBlock = {
      id: uuidv4(),
      characterId: selectedId,
      text: '',
    };

    if (afterBlockId) {
      const index = dialogueBlocks.findIndex(block => block.id === afterBlockId);
      if (index !== -1) {
        const newBlocks = [...dialogueBlocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setDialogueBlocks(newBlocks);
      } else {
        setDialogueBlocks([...dialogueBlocks, newBlock]); // Fallback to add at end
      }
    } else {
      setDialogueBlocks([...dialogueBlocks, newBlock]);
    }
    setLastAddedBlockId(newBlock.id); // Set ID to focus this new block
  };

  const handleDialogueTextChange = (id, newText) => {
    setDialogueBlocks(dialogueBlocks.map(block =>
      block.id === id ? { ...block, text: newText } : block
    ));
  };

  const handleRemoveDialogueBlock = (id) => {
    setDialogueBlocks(dialogueBlocks.filter(block => block.id !== id));
  };

  const handleKeymapAction = (action) => {
    if (action.startsWith('select:')) {
      const selectAction = action.split(':')[1];

      if (selectAction === 'no_character') {
        if (focusedEditorId) {
          setDialogueBlocks(dialogueBlocks.map(block =>
            block.id === focusedEditorId ? { ...block, characterId: null } : block
          ));
        } 
        // Do nothing if no editor is focused and Alt+0 is pressed
      } else {
        const index = parseInt(selectAction, 10);
        const charToSelect = characters[index];

        if (charToSelect) {
          if (focusedEditorId) {
            // Update the character of the focused dialogue block
            setDialogueBlocks(dialogueBlocks.map(block =>
              block.id === focusedEditorId ? { ...block, characterId: charToSelect.id } : block
            ));
          } else {
            // If no editor is focused, update the global selectedId (for CharaCarousel/Preview)
            setSelectedId(charToSelect.id);
          }
        }
      }
    }
    if (action === 'start_recording') {
      console.log('Start recording action triggered');
      // Here you would typically trigger the Web Audio API to start recording.
    }
  };

  useKeyMapManager({
    isEnabled: focusedEditorId !== null,
    onAction: handleKeymapAction,
  });

  return (
    <div className="novel-talk">
      <Header title="NovelTalk" showAutoSkip />
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      
      {activeTab === 'talk' && (
        <>
          <CharaCarousel characters={characters} selectedId={selectedId} onSelect={setSelectedId} />
          <div className="nt-separator" />
          <button onClick={handleAddDialogueBlock} style={{ marginBottom: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            新しいセリフブロックを追加
          </button>
          <div className="nt-body" style={{ display: 'block' }}> {/* Changed to block to stack dialogue blocks */}
            {dialogueBlocks.map(block => {
              const blockCharacter = characters.find(c => c.id === block.characterId);
              return (
                <DialogueBlock
                  key={block.id}
                  ref={el => editorRefs.current.set(block.id, el)}
                  dialogue={block}
                  character={blockCharacter}
                  onTextChange={handleDialogueTextChange}
                  onRemoveBlock={handleRemoveDialogueBlock}
                  onFocus={() => setFocusedEditorId(block.id)}
                  onBlur={() => setFocusedEditorId(null)}
                  onCtrlEnter={handleAddDialogueBlock}
                />
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'character' && (
        <CharacterScreen initialCharacters={characters} onCharactersChange={setCharacters} />
      )}
    </div>
  );
}

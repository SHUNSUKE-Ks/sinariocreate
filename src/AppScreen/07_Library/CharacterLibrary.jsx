import React, { useState, useEffect } from 'react';
import LibraryToolbar from '@/components/library/LibraryToolbar';
import LibraryList from '@/components/library/LibraryList';

// ダミーデータ
const dummyCharacters = [
  { id: 'char_001', name: '勇者アルス', icon: 'icon_swordsman', isInGame: true },
  { id: 'char_002', name: '魔法使いレイ', icon: 'icon_mage', isInGame: false },
  { id: 'char_003', name: '盗賊カイト', icon: 'icon_rogue', isInGame: true },
];

const CharacterLibrary = () => {
  const [mode, setMode] = useState('view'); // 'view' or 'edit'
  const [filter, setFilter] = useState('all'); // 'all', 'inGame', 'notInGame'
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO: Firestoreからキャラクターのマスターデータと状態データを取得し、マージする
    
    // フィルターロジック
    const filteredItems = dummyCharacters.filter(item => {
      if (filter === 'inGame') return item.isInGame;
      if (filter === 'notInGame') return !item.isInGame;
      return true;
    });
    setItems(filteredItems);
  }, [filter]);

  return (
    <div>
      <LibraryToolbar mode={mode} setMode={setMode} filter={filter} setFilter={setFilter} />
      <LibraryList items={items} mode={mode} type="character" />
    </div>
  );
};

export default CharacterLibrary;

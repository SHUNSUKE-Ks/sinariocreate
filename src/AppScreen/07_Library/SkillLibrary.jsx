import React, { useState, useEffect } from 'react';
import LibraryToolbar from '@/components/library/LibraryToolbar';
import LibraryList from '@/components/library/LibraryList';

// ダミーデータ
const dummySkills = [
  { id: 'skill_001', name: 'ファイアボール', effect: '火の玉を放つ', icon: 'icon_fire', isInGame: true, type: 'skill' },
  { id: 'trait_001', name: '勇敢', effect: '恐怖状態にならない', icon: 'icon_heart', isInGame: true, type: 'trait' },
  { id: 'ability_001', name: '二刀流', effect: '両手に武器を装備できる', icon: 'icon_dual_swords', isInGame: false, type: 'ability' },
];

const SkillLibrary = () => {
  const [mode, setMode] = useState('view'); // 'view' or 'edit'
  const [filter, setFilter] = useState('all'); // 'all', 'inGame', 'notInGame'
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO: Firestoreから技能・特質・アビリティのマスターデータと状態データを取得し、マージする
    
    // フィルターロジック
    const filteredItems = dummySkills.filter(item => {
      if (filter === 'inGame') return item.isInGame;
      if (filter === 'notInGame') return !item.isInGame;
      return true;
    });
    setItems(filteredItems);
  }, [filter]);

  return (
    <div>
      <LibraryToolbar mode={mode} setMode={setMode} filter={filter} setFilter={setFilter} />
      <LibraryList items={items} mode={mode} type="skill" />
    </div>
  );
};

export default SkillLibrary;

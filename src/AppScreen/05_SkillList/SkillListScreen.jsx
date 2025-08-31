import React, { useState } from 'react';
import TabNavigation from '@/AppScreen/02_CharacterCreator/TabNavigation';

const SkillListScreen = () => {
  const [activeTab, setActiveTab] = useState('skill'); // 'skill', 'trait', 'ability'

  // ダミーデータ
  const skills = [
    { id: 1, name: 'ファイアボール', description: '炎の玉を放つ魔法', type: 'skill' },
    { id: 2, name: 'ヒール', description: '傷を癒す魔法', type: 'skill' },
  ];

  const traits = [
    { id: 1, name: '勇敢', description: '恐怖に打ち勝つ精神力', type: 'trait' },
    { id: 2, name: '器用', description: '手先が器用で細かい作業が得意', type: 'trait' },
  ];

  const abilities = [
    { id: 1, name: '二刀流', description: '両手に武器を装備できる', type: 'ability' },
    { id: 2, name: '高速詠唱', description: '魔法の発動が速くなる', type: 'ability' },
  ];

  const skillTabs = [
    { name: 'スキル', id: 'skill' },
    { name: '特質', id: 'trait' },
    { name: 'アビリティー', id: 'ability' },
  ];

  const filteredContent = () => {
    switch (activeTab) {
      case 'skill':
        return skills;
      case 'trait':
        return traits;
      case 'ability':
        return abilities;
      default:
        return [];
    }
  };

  return (
    <div>
      <h2>スキルリスト</h2>
      <TabNavigation tabs={skillTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="skill-list-container">
        {filteredContent().length > 0 ? (
          filteredContent().map(item => (
            <div key={item.id} className="skill-card">
              <div className="skill-name">{item.name}</div>
              <div className="skill-description">{item.description}</div>
            </div>
          ))
        ) : (
          <p>該当する項目はありません。</p>
        )}
      </div>

      <style jsx>{`
        .skill-list-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* 2列表示 */
          gap: 15px;
          padding: 15px;
          border: 1px solid #666;
          background-color: #111;
          margin-top: 20px;
        }
        .skill-card {
          background-color: #222;
          border: 1px solid #444;
          padding: 10px;
          border-radius: 5px;
          color: #fff;
        }
        .skill-name {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .skill-description {
          font-size: 14px;
          color: #bbb;
        }
      `}</style>
    </div>
  );
};

export default SkillListScreen;
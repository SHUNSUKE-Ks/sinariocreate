import React, { useState } from 'react';
import TabNavigation from '@/AppScreen/02_CharacterCreator/TabNavigation';

const ItemListScreen = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'tool', 'weapon', 'armor', 'key'

  // ダミーデータ
  const items = [
    { id: 1, type: 'tool', name: 'ポーション', quantity: 5, icon: '💊' },
    { id: 2, type: 'weapon', name: '木の剣', quantity: 1, icon: '⚔️' },
    { id: 3, type: 'armor', name: '革の鎧', quantity: 1, icon: '🛡️' },
    { id: 4, type: 'key', name: '地下室の鍵', quantity: 1, icon: '🔑' },
    { id: 5, type: 'tool', name: 'エリクサー', quantity: 2, icon: '🧪' },
    { id: 6, type: 'weapon', name: '鉄の斧', quantity: 1, icon: '🪓' },
    { id: 7, type: 'armor', name: '鉄の盾', quantity: 1, icon: '🛡️' },
  ];

  const itemTabs = [
    { name: 'すべて', id: 'all' },
    { name: '道具', id: 'tool' },
    { name: '武器', id: 'weapon' },
    { name: '防具', id: 'armor' },
    { name: 'キーアイテム', id: 'key' },
  ];

  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div>
      <h2>アイテムリスト</h2>
      <TabNavigation tabs={itemTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="item-list-container">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-icon" style={{ border: '1px solid white' }}>{item.icon}</div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity">{item.quantity}</div>
              </div>
            </div>
          ))
        ) : (
          <p>該当するアイテムはありません。</p>
        )}
      </div>

      <style jsx>{`
        .item-list-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 15px;
          border: 1px solid #666;
          background-color: #111;
          margin-top: 20px;
        }
        .item-card {
          display: flex;
          align-items: center;
          background-color: #222;
          border: 1px solid #444;
          padding: 10px;
          border-radius: 5px;
          color: #fff;
          justify-content: space-between; /* アイコンと詳細を両端に */
        }
        .item-icon {
          font-size: 30px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px; /* アイコンのサイズを固定 */
          height: 50px; /* アイコンのサイズを固定 */
          border: 1px solid white; /* 白い枠 */
        }
        .item-details {
          flex-grow: 1;
          display: flex; /* 名前と数量を横並びに */
          justify-content: space-between; /* 名前と数量を両端に */
          align-items: center;
        }
        .item-name {
          font-weight: bold;
          font-size: 16px;
        }
        .item-quantity {
          font-size: 14px;
          color: #bbb;
          text-align: right; /* 数量を右寄せ */
          min-width: 40px; /* 数量の最小幅を確保 */
        }
      `}</style>
    </div>
  );
};

export default ItemListScreen;
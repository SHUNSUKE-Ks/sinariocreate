import React from 'react';

/**
 * リストの各行アイテム
 * @param {object} props
 * @param {object} props.item - 表示するアイテムのデータ
 * @param {string} props.mode - 現在のモード ('view' or 'edit')
 * @param {string} props.type - アイテムの種類 ('character' or 'skill')
 */
const LibraryListItem = ({ item, mode, type }) => {

  const handleCheckboxChange = () => {
    // TODO: Firestoreの`gameReflectionStatus`を更新する
    console.log(`Checkbox for ${item.id} changed.`);
  };

  const handleEdit = () => {
    // TODO: 編集画面に遷移するロジック
    console.log(`Edit ${item.id}`);
  };

  const handleDelete = () => {
    // TODO: Firestoreからマスターデータと状態データを削除するロジック
    console.log(`Delete ${item.id}`);
  };

  // 観覧モードのレイアウト
  if (mode === 'view') {
    return (
      <div className="flex items-center p-3 bg-gray-800 rounded-lg">
        <div className="w-10 h-10 bg-gray-700 rounded-md mr-4">{/* icon */}</div>
        <div>
          <div className="font-bold text-white">{item.name}</div>
          {type === 'skill' && <div className="text-sm text-gray-400">{item.effect}</div>}
        </div>
      </div>
    );
  }

  // 編集モードのレイアウト
  return (
    <div className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg">
      <input 
        type="checkbox" 
        checked={item.isInGame}
        onChange={handleCheckboxChange}
        className="w-5 h-5 mr-4 bg-gray-900 border-gray-600 rounded text-sky-500 focus:ring-sky-600"
      />
      <div className="flex-grow">
        <div className="font-bold text-white">{item.name}</div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleEdit} className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">編集</button>
        <button onClick={handleDelete} className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">削除</button>
      </div>
    </div>
  );
};

export default LibraryListItem;

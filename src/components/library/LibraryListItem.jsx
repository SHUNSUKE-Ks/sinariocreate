import React, { useState } from 'react';

/**
 * ライブラリ行アイテム
 * @param {object} props
 * @param {object} props.item
 * @param {string} props.mode 'view' | 'edit'
 * @param {string} props.type 'character' | 'skill'
 */
const LibraryListItem = ({ item, mode, type }) => {
  const handleCheckboxChange = () => {
    console.log(`Checkbox for ${item.id} changed.`);
  };
  const handleEdit = () => console.log(`Edit ${item.id}`);
  const handleDelete = () => console.log(`Delete ${item.id}`);

  // View mode
  if (mode === 'view') {
    if (type === 'character' && Array.isArray(item.expressions) && item.expressions.length > 0) {
      const [idx, setIdx] = useState(0);
      const cur = item.expressions[idx % item.expressions.length];
      const next = () => setIdx(i => (i + 1) % item.expressions.length);
      return (
        <button onClick={next} className="w-full text-left flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
          <img src={cur.url} alt={cur.id} className="w-10 h-10 object-contain rounded-md mr-4" />
          <div>
            <div className="font-bold text-white">{item.name}</div>
            <div className="text-sm text-gray-400">{cur.id}</div>
          </div>
        </button>
      );
    }
    return (
      <div className="flex items-center p-3 bg-gray-800 rounded-lg">
        <div className="w-10 h-10 bg-gray-700 rounded-md mr-4"></div>
        <div>
          <div className="font-bold text-white">{item.name}</div>
          {type === 'skill' && <div className="text-sm text-gray-400">{item.effect}</div>}
        </div>
      </div>
    );
  }

  // Edit mode
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


import React from 'react';

/**
 * ライブラリのツールバー
 * @param {object} props
 * @param {string} props.mode - 現在のモード ('view' or 'edit')
 * @param {function} props.setMode - モードを変更する関数
 * @param {string} props.filter - 現在のフィルター ('all', 'inGame', 'notInGame')
 * @param {function} props.setFilter - フィルターを変更する関数
 */
const LibraryToolbar = ({ mode, setMode, filter, setFilter }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mb-4">
      {/* モード切替 */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-300">モード:</span>
        <button onClick={() => setMode('view')} className={`px-3 py-1 text-sm rounded-md ${mode === 'view' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300'}`}>観覧</button>
        <button onClick={() => setMode('edit')} className={`px-3 py-1 text-sm rounded-md ${mode === 'edit' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}>編集</button>
      </div>

      {/* フィルター */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-300">フィルター:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-gray-700 text-white rounded-md p-1 text-sm border-gray-600">
          <option value="all">All</option>
          <option value="inGame">ゲームに反映</option>
          <option value="notInGame">ゲームに未反映</option>
        </select>
      </div>
    </div>
  );
};

export default LibraryToolbar;

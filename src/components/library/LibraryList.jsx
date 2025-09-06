import React from 'react';
import LibraryListItem from './LibraryListItem';

/**
 * アイテムのリスト
 * @param {object} props
 * @param {Array<object>} props.items - 表示するアイテムの配列
 * @param {string} props.mode - 現在のモード ('view' or 'edit')
 * @param {string} props.type - アイテムの種類 ('character' or 'skill')
 */
const LibraryList = ({ items, mode, type }) => {
  if (items.length === 0) {
    return <div className="text-center text-gray-500 py-8">アイテムがありません。</div>;
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <LibraryListItem key={item.id} item={item} mode={mode} type={type} />
      ))}
    </div>
  );
};

export default LibraryList;

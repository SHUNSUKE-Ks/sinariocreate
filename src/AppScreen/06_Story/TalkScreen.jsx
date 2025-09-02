import React, { useState } from 'react';
import { TextDaialogCard, CharacterImagecard } from '@/components/cards';
import useCharacterImage from '@/hooks/useCharacterImage';
import sinarioData from '@/data/sinario01.json'; // sinario01.jsonをインポート

const TalkScreen = () => {
  const { getCharacterImagePath, loading, error } = useCharacterImage();
  const [currentSinarioId, setCurrentSinarioId] = useState(1); // 現在のsinarioIDを管理

  if (loading) {
    return <div>画像を読み込み中...</div>;
  }

  if (error) {
    return <div>画像の読み込みに失敗しました: {error.message}</div>;
  }

  // 現在のsinarioIDに対応するシナリオデータを取得
  const currentSinario = sinarioData.chapter01.find(s => s.sinarioID === currentSinarioId);

  if (!currentSinario) {
    return <div>シナリオデータが見つかりません。</div>;
  }

  const characterImagePath = getCharacterImagePath(currentSinario.characterImage);

  // sinarioIDを増減させる関数
  const handleSinarioIdChange = (change) => {
    const newId = currentSinarioId + change;
    if (newId >= 1 && newId <= sinarioData.chapter01.length) {
      setCurrentSinarioId(newId);
    }
  };

  return (
    <div className="scene">
      <div className="textCard">
        <TextDaialogCard name={currentSinario.speaker} text={currentSinario.text} />
      </div>
      <div className="imageCard">
        {characterImagePath ? (
          <CharacterImagecard imageSrc={characterImagePath} alt="キャラクター" />
        ) : (
          <div className="character-image-card placeholder">画像なし</div>
        )}
      </div>

      {/* sinarioID操作ボタン */}
      <div className="sinario-nav-buttons">
        <button onClick={() => handleSinarioIdChange(-1)}>前へ</button>
        <button onClick={() => handleSinarioIdChange(1)}>次へ</button>
      </div>

      <style jsx>{`
        .scene {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          max-width: 100vw;
          max-height: 100vh;
          margin: auto;
          overflow: hidden;
          background-color: #333;
        }
        .textCard {
          position: absolute;
          left: 16.4%;
          top: 13.5%;
          width: 29.0%;
          height: 70.8%;
        }
        .imageCard {
          position: absolute;
          left: 57.4%;
          top: 15.9%;
          width: 27.9%;
          height: 57.6%;
        }
        .sinario-nav-buttons {
          position: absolute;
          bottom: 20px; /* 画面下からの位置 */
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 100;
        }
        .sinario-nav-buttons button {
          padding: 10px 20px;
          background-color: #555;
          color: white;
          border: 1px solid #777;
          border-radius: 5px;
          cursor: pointer;
        }
        .sinario-nav-buttons button:hover {
          background-color: #777;
        }
      `}</style>
    </div>
  );
};

export default TalkScreen;


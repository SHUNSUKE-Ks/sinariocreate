import React from 'react';
import { TextDaialogCard, CharacterImagecard } from '@/components/cards';
import useCharacterImage from '@/hooks/useCharacterImage';

const TalkScreen = () => {
  const { getCharacterImagePath, loading, error } = useCharacterImage();
  const text = `しかし、女には「太陽って何？」と聞き返されてしまう.\n何やら、本当に太陽を知らない様子だが……`;

  if (loading) {
    return <div>画像を読み込み中...</div>;
  }

  if (error) {
    return <div>画像の読み込みに失敗しました: {error.message}</div>;
  }

  const characterImagePath = getCharacterImagePath('chara_paper_master');

  return (
    <div className="scene">
      <div className="textCard">
        <TextDaialogCard name="村人・悩める女" text={text} />
      </div>
      <div className="imageCard">
        {characterImagePath ? (
          <CharacterImagecard imageSrc={characterImagePath} alt="キャラクター" />
        ) : (
          <div className="character-image-card placeholder">画像なし</div>
        )}
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
      `}</style>
    </div>
  );
};

export default TalkScreen;


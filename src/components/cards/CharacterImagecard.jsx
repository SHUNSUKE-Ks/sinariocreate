import React from 'react';
import './cards.css';

/**
 * CharacterImagecard
 * Props:
 *  - characterImageCard | imageSrc: string (image url)
 *  - alt?: string
 */
const CharacterImagecard = ({ characterImageCard, imageSrc, alt = 'Character' }) => {
  const src = characterImageCard || imageSrc;
  return (
    <div className="character-image-card">
      {src ? (
        <img className="character-image" src={src} alt={alt} />
      ) : (
        <div className="character-image placeholder">No Image</div>
      )}
    </div>
  );
};

export default CharacterImagecard;


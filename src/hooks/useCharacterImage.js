import { useState, useEffect } from 'react';

const useCharacterImage = () => {
  const [characterImages, setCharacterImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterImages = async () => {
      try {
        // Viteでpublicフォルダ内のファイルを読み込む場合、直接パスを指定
        const response = await fetch('/src/data/EntrySheet/Entry_CharacterImage.jsonc');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacterImages(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterImages();
  }, []);

  const getCharacterImagePath = (key) => {
    if (loading) return null; // Or a loading placeholder
    if (error) return null; // Or an error placeholder

    const path = characterImages[key];
    if (path === "発注中" || path === "未登録") {
      return null; // Or a placeholder for unfulfilled orders
    } else if (path) {
      return path;
    }
    return null; // Default if key not found
  };

  return { getCharacterImagePath, loading, error };
};

export default useCharacterImage;
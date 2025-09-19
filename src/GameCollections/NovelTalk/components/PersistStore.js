const STORAGE_KEY = 'noveltalk.characters';

export const loadCharacters = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load characters from localStorage', error);
    return [];
  }
};

export const saveCharacters = (characters) => {
  try {
    const data = JSON.stringify(characters);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Failed to save characters to localStorage', error);
  }
};

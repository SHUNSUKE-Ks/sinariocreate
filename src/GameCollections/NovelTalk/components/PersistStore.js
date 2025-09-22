const STORAGE_KEY = 'noveltalk.characters';

const defaultCharacters = [
  { id: 'default-a', name: 'A' },
  { id: 'default-b', name: 'B' },
  { id: 'default-npc', name: 'NPC' },
];

export const loadCharacters = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsedData = data ? JSON.parse(data) : null;
    // If no data or empty array, return defaults
    return (parsedData && parsedData.length > 0) ? parsedData : defaultCharacters;
  } catch (error) {
    console.error('Failed to load characters from localStorage', error);
    return defaultCharacters;
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

import { useCharacter } from './useCharacter';
import { initialCharacterState } from '../context/characterReducer'; // Import initial state

export const useCharacterStats = () => {
  const { dispatch } = useCharacter();

  const resetStats = () => {
    dispatch({ type: 'RESET_STATS', payload: initialCharacterState.stats });
    dispatch({ type: 'SET_TALENT_POINTS', payload: initialCharacterState.talentPoints });
  };

  const randomizeStats = () => {
    const newStats = {};
    let currentTalentPoints = initialCharacterState.talentPoints;
    const statNames = Object.keys(initialCharacterState.stats);

    // Set all stats to minimum (8) and calculate remaining points
    statNames.forEach(stat => {
      newStats[stat] = 8;
      currentTalentPoints += (initialCharacterState.stats[stat] - 8); // Add back points from initial 10 to 8
    });

    // Distribute remaining points randomly
    while (currentTalentPoints > 0) {
      const randomStat = statNames[Math.floor(Math.random() * statNames.length)];
      if (newStats[randomStat] < 18) {
        newStats[randomStat]++;
        currentTalentPoints--;
      }
    }
    
    dispatch({ type: 'RANDOMIZE_STATS', payload: newStats });
    dispatch({ type: 'SET_TALENT_POINTS', payload: 0 }); // All points used
  };

  return { resetStats, randomizeStats };
};

export const initialCharacterState = {
  name: '',
  gender: '♂',
  origin: '',
  appearance: '',
  stats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  talentPoints: 30,
  skills: [],
  traits: [],
};

export const characterReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_ORIGIN':
      return { ...state, origin: action.payload };
    case 'UPDATE_GENDER':
      return { ...state, gender: action.payload };
    
    case 'CHANGE_STAT':
      const { stat, amount } = action.payload;
      const currentValue = state.stats[stat];
      const newTalentPoints = state.talentPoints - amount;

      // Prevent stats from going below 8 or above 18
      if (currentValue + amount < 8 || currentValue + amount > 18) {
        return state;
      }
      // Prevent talent points from going below 0
      if (newTalentPoints < 0) {
        return state;
      }
      // Prevent spending points you don't have (for increasing stats)
      if (amount > 0 && state.talentPoints <= 0) {
          return state;
      }
      
      return {
        ...state,
        talentPoints: newTalentPoints,
        stats: {
          ...state.stats,
          [stat]: currentValue + amount,
        },
      };

    case 'RESET_STATS':
      return { ...state, stats: action.payload };
    case 'RANDOMIZE_STATS':
      return { ...state, stats: action.payload };
    case 'SET_TALENT_POINTS':
      return { ...state, talentPoints: action.payload };

    default:
      return state;
  }
};
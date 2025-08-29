import React from 'react';
import { useCharacter } from '@/hooks/useCharacter';

// Helper array for mapping over stats
const STAT_NAMES = [
  { id: 'strength', label: '筋力' },
  { id: 'dexterity', label: '器用さ' },
  { id: 'constitution', label: '耐久力' },
  { id: 'intelligence', label: '知力' },
  { id: 'wisdom', label: '判断力' },
  { id: 'charisma', label: '魅力' },
];

const StatsTab = () => {
  const { state, dispatch } = useCharacter();

  const handleStatChange = (stat, amount) => {
    const currentValue = state.stats[stat];
    // Basic validation, more complex logic will be in the reducer
    if ((amount > 0 && state.talentPoints > 0) || amount < 0) {
       dispatch({
         type: 'CHANGE_STAT',
         payload: { stat, amount }
       });
    }
  };

  return (
    <div className="tab-content active" id="stats">
        <div className="panel">
            <div className="stats-section">
              {STAT_NAMES.map(({ id, label }) => (
                <div className="stat-row" key={id}>
                    <span className="stat-name">{label}</span>
                    <div className="stat-controls">
                        <button className="stat-btn" onClick={() => handleStatChange(id, -1)}>−</button>
                        <span className="stat-value">{state.stats[id]}</span>
                        <button className="stat-btn" onClick={() => handleStatChange(id, 1)}>+</button>
                    </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
};

export default StatsTab;

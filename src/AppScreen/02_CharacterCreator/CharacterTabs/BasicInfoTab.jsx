import React from 'react';
import { useCharacter } from '@/hooks/useCharacter';

const BasicInfoTab = () => {
  const { state, dispatch } = useCharacter();

  const handleNameChange = (e) => {
    dispatch({ type: 'UPDATE_NAME', payload: e.target.value });
  };

  const handleOriginChange = (e) => {
    dispatch({ type: 'UPDATE_ORIGIN', payload: e.target.value });
  };
  
  const handleGenderToggle = () => {
    const newGender = state.gender === '♂' ? '♀' : '♂';
    dispatch({ type: 'UPDATE_GENDER', payload: newGender });
  };

  return (
    <div className="tab-content active" id="basic">
        <div className="panel">
            <div className="name-section">
                <div className="name-input">
                    <input 
                      type="text" 
                      className="name-field" 
                      value={state.name} 
                      onChange={handleNameChange}
                      maxLength="20" 
                      placeholder="名前を入力" 
                    />
                    <div className="icon-buttons">
                        <button className="icon-btn" title="性別" onClick={handleGenderToggle}>
                          {state.gender}
                        </button>
                        <button className="icon-btn" title="ランダム">⚃</button>
                    </div>
                </div>
            </div>

            <div className="description-area">
                <div className="description-label">出自:</div>
                <textarea 
                  className="description-text" 
                  placeholder="キャラクターの出自を入力してください..."
                  value={state.origin}
                  onChange={handleOriginChange}
                ></textarea>
            </div>

             <div className="points-section">
                <div className="points-display">残り才能: {state.talentPoints}</div>
                <div className="bottom-buttons">
                    <button className="bottom-btn">戻る</button>
                    <button className="bottom-btn">プリセット</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BasicInfoTab;

import React from 'react';

const SkillsTab = () => {
  return (
    <div className="tab-content active" id="skills">
        <div className="panel">
            <div className="skills-section">
                <div className="section-title">スキル:
                    <button className="header-btn" style={{ fontSize: '12px', padding: '4px 8px', float: 'right' }}>追加保存</button>
                </div>
                <div className="skill-row">
                    <input type="text" className="skill-name" placeholder="スキル名" />
                    <input type="text" className="skill-dict" placeholder="説明" />
                </div>
                <div className="skill-row">
                    <input type="text" className="skill-name" placeholder="スキル名" />
                    <input type="text" className="skill-dict" placeholder="説明" />
                </div>
            </div>

            <div className="traits-section">
                <div className="section-title">特質:
                    <button className="header-btn" style={{ fontSize: '12px', padding: '4px 8px', float: 'right' }}>追加保存</button>
                </div>
                <div className="trait-row">
                    <input type="text" className="trait-name" placeholder="特質名" />
                    <input type="text" className="trait-dict" placeholder="説明" />
                </div>
                <div className="trait-row">
                    <input type="text" className="trait-name" placeholder="特質名" />
                    <input type="text" className="trait-dict" placeholder="説明" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default SkillsTab;
import React, { useState } from "react";

const Rules = () => {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="rules-container">
      <button className="rules-button" onClick={toggleRules}>
        {showRules ? "ルールを隠す" : "ルールを見る"}
      </button>
      {showRules && (
        <div className="rules-content">
          <h2>ゲームルール</h2>
          <p>1. 各プレイヤーが順番にカードを出します。</p>
          <p>2. 合計値が9を超えたプレイヤーが負け、他プレイヤーに1ポイントが加算されます。</p>
          <p>3. 先に5ポイント獲得したプレイヤーが優勝です。</p>
        </div>
      )}
    </div>
  );
};

export default Rules;

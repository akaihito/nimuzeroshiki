import React from 'react';

const GameResult = ({ scores, winner, onRestart }) => {
  // スコア順にプレイヤーを並べ替え
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="result-popup">
      <div className="result-content">
        <h2>ゲーム終了！</h2>
        <h3>優勝者: {Array.isArray(winner) ? winner.join(' と ') : winner}</h3> {/* 同率優勝者を表示 */}
        <h4>ランキング</h4>
        <ol>
          {sortedScores.map(([player, score], index) => (
            <li key={index}>
              {player}: {score} ポイント
            </li>
          ))}
        </ol>
        <button onClick={onRestart}>再試合</button>
      </div>
    </div>
  );
};

export default GameResult;

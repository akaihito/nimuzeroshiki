<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Player from './Player';
import Rules from './Rules'; // ルールコンポーネント
import GameResult from './GameResult'; // 結果ポップアップコンポーネント

const GameBoard = () => {
  const [players, setPlayers] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // 優勝者を1人に設定
  const [scores, setScores] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1'); // Player 1 の名前を管理
  const [gameStarted, setGameStarted] = useState(false); // ゲーム開始フラグ

  // プレイヤー名の入力を受け取るための関数
  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  // ゲーム開始時にプレイヤーを生成
  const startGame = () => {
    const initialPlayers = generatePlayers();
    setPlayers(initialPlayers);
    setScores(
      initialPlayers.reduce((acc, player) => {
        acc[player.name] = 0;
        return acc;
      }, {})
    );
    setGameStarted(true); // ゲーム開始フラグを立てる
  };

  const generatePlayers = () => {
    const cards = Array(40)
      .fill()
      .map((_, i) => ({ id: i, value: i % 4 })); // 0〜3のカードを40枚生成
    cards.sort(() => Math.random() - 0.5); // シャッフル

    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      name: i === 0 ? playerName : `Computer ${i}`, // Player 1 の名前をユーザー入力に基づいて設定
      hand: cards.slice(i * 4, (i + 1) * 4),
      passed: false,
      score: 0, // スコアを追加
    }));
  };

  const handleCardClick = (playerId, card) => {
    if (gameOver || players[currentPlayerIndex]?.id !== playerId) return;

    playCard(playerId, card);
  };

  const playCard = (playerId, card) => {
    const newSum = currentSum + card.value;
    const newPlayers = players.map((player) =>
      player.id === playerId
        ? { ...player, hand: player.hand.filter((c) => c.id !== card.id) }
        : player
    );

    if (newSum > 9) {
      const currentPlayer = players[currentPlayerIndex];
      const updatedScores = { ...scores };

      // 9を超えたプレイヤー以外に1ポイント加算
      players.forEach((player) => {
        if (player.id !== currentPlayer.id) {
          updatedScores[player.name] += 1;
          player.score += 1;  // playerオブジェクトに直接スコアを加算
        }
      });

      setScores(updatedScores);
      setPlayers([...players]);  // スコア更新後にstateを更新

      // 勝者判定（同率優勝の判定も含む）
      const gameWinners = Object.entries(updatedScores).filter(
        ([, score]) => score >= 5
      );

      if (gameWinners.length > 0) {
        setGameEnd(true);
        setWinner(gameWinners.map(([name]) => name)); // 複数の優勝者
      } else {
        setGameOver(true); // ラウンド終了
      }
    } else {
      setCurrentSum(newSum);
      setPlayers(newPlayers);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const computerPlay = () => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer || currentPlayer.id === 0) return;

    // 合計値が9を超えないカードをランダムに選ぶ
    const validCards = currentPlayer.hand.filter(
      (card) => currentSum + card.value <= 9 && card.value !== 0
    );

    let cardToPlay;
    if (validCards.length > 0) {
      cardToPlay = validCards[Math.floor(Math.random() * validCards.length)];
    } else {
      // ランダムに最小のカードを選ぶ
      cardToPlay = currentPlayer.hand.reduce((minCard, card) =>
        card.value < minCard.value ? card : minCard
      );
    }

    playCard(currentPlayer.id, cardToPlay);
  };

  useEffect(() => {
    if (gameOver || gameEnd) return;

    if (players.length > 0 && players[currentPlayerIndex]?.id !== 0) {
      setTimeout(() => {
        computerPlay();
      }, 1000); // 1秒の遅延
    }
  }, [currentPlayerIndex, players, currentSum, gameOver, gameEnd]);

  const resetRound = () => {
    setGameOver(false);
    setCurrentSum(0);
    setPlayers(generatePlayers());
    setCurrentPlayerIndex(0);
  };

  const restartGame = () => {
    setGameEnd(false);
    setScores(
      players.reduce((acc, player) => {
        acc[player.name] = 0;
        return acc;
      }, {})
    );
    resetRound();
  };

  return (
    <div className="game-board">
      {/* 名前入力フォーム */}
      {!gameStarted && (
        <div>
          <h3>プレイヤー1の名前を入力してください:</h3>
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            placeholder="名前を入力"
          />
          <button onClick={startGame}>ゲーム開始</button>
        </div>
      )}

      {/* ゲームのメイン画面 */}
      {gameStarted && (
        <>
          <Rules /> {/* ルール表示ボタン */}
          <h2>合計値: {currentSum}</h2>
          <div className="scores">
            {Object.entries(scores).map(([player, score]) => (
              <p key={player}>
                {player}: {score}ポイント
              </p>
            ))}
          </div>
          {players.map((player, index) => (
            index === currentPlayerIndex && (
              <Player key={player.id} player={player} onPlayCard={handleCardClick} />
            )
          ))}
          {gameOver && !gameEnd && (
            <div>
              <h2>ラウンド終了! 次のラウンドを始めます。</h2>
              <button onClick={resetRound}>次のラウンド</button>
            </div>
          )}
          {gameEnd && (
            <GameResult scores={scores} winner={winner} onRestart={restartGame} /> // 結果ポップアップ
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
=======
import React, { useState, useEffect } from 'react';
import Player from './Player';
import Rules from './Rules'; // ルールコンポーネント
import GameResult from './GameResult'; // 結果ポップアップコンポーネント

const GameBoard = () => {
  const [players, setPlayers] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // 優勝者を1人に設定
  const [scores, setScores] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1'); // Player 1 の名前を管理
  const [gameStarted, setGameStarted] = useState(false); // ゲーム開始フラグ

  // プレイヤー名の入力を受け取るための関数
  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  // ゲーム開始時にプレイヤーを生成
  const startGame = () => {
    const initialPlayers = generatePlayers();
    setPlayers(initialPlayers);
    setScores(
      initialPlayers.reduce((acc, player) => {
        acc[player.name] = 0;
        return acc;
      }, {})
    );
    setGameStarted(true); // ゲーム開始フラグを立てる
  };

  const generatePlayers = () => {
    const cards = Array(40)
      .fill()
      .map((_, i) => ({ id: i, value: i % 4 })); // 0〜3のカードを40枚生成
    cards.sort(() => Math.random() - 0.5); // シャッフル

    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      name: i === 0 ? playerName : `Computer ${i}`, // Player 1 の名前をユーザー入力に基づいて設定
      hand: cards.slice(i * 4, (i + 1) * 4),
      passed: false,
      score: 0, // スコアを追加
    }));
  };

  const handleCardClick = (playerId, card) => {
    if (gameOver || players[currentPlayerIndex]?.id !== playerId) return;

    playCard(playerId, card);
  };

  const playCard = (playerId, card) => {
    const newSum = currentSum + card.value;
    const newPlayers = players.map((player) =>
      player.id === playerId
        ? { ...player, hand: player.hand.filter((c) => c.id !== card.id) }
        : player
    );

    if (newSum > 9) {
      const currentPlayer = players[currentPlayerIndex];
      const updatedScores = { ...scores };

      // 9を超えたプレイヤー以外に1ポイント加算
      players.forEach((player) => {
        if (player.id !== currentPlayer.id) {
          updatedScores[player.name] += 1;
          player.score += 1;  // playerオブジェクトに直接スコアを加算
        }
      });

      setScores(updatedScores);
      setPlayers([...players]);  // スコア更新後にstateを更新

      // 勝者判定（同率優勝の判定も含む）
      const gameWinners = Object.entries(updatedScores).filter(
        ([, score]) => score >= 5
      );

      if (gameWinners.length > 0) {
        setGameEnd(true);
        setWinner(gameWinners.map(([name]) => name)); // 複数の優勝者
      } else {
        setGameOver(true); // ラウンド終了
      }
    } else {
      setCurrentSum(newSum);
      setPlayers(newPlayers);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const computerPlay = () => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer || currentPlayer.id === 0) return;

    // 合計値が9を超えないカードをランダムに選ぶ
    const validCards = currentPlayer.hand.filter(
      (card) => currentSum + card.value <= 9 && card.value !== 0
    );

    let cardToPlay;
    if (validCards.length > 0) {
      cardToPlay = validCards[Math.floor(Math.random() * validCards.length)];
    } else {
      // ランダムに最小のカードを選ぶ
      cardToPlay = currentPlayer.hand.reduce((minCard, card) =>
        card.value < minCard.value ? card : minCard
      );
    }

    playCard(currentPlayer.id, cardToPlay);
  };

  useEffect(() => {
    if (gameOver || gameEnd) return;

    if (players.length > 0 && players[currentPlayerIndex]?.id !== 0) {
      setTimeout(() => {
        computerPlay();
      }, 1000); // 1秒の遅延
    }
  }, [currentPlayerIndex, players, currentSum, gameOver, gameEnd]);

  const resetRound = () => {
    setGameOver(false);
    setCurrentSum(0);
    setPlayers(generatePlayers());
    setCurrentPlayerIndex(0);
  };

  const restartGame = () => {
    setGameEnd(false);
    setScores(
      players.reduce((acc, player) => {
        acc[player.name] = 0;
        return acc;
      }, {})
    );
    resetRound();
  };

  return (
    <div className="game-board">
      {/* 名前入力フォーム */}
      {!gameStarted && (
        <div>
          <h3>プレイヤー1の名前を入力してください:</h3>
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            placeholder="名前を入力"
          />
          <button onClick={startGame}>ゲーム開始</button>
        </div>
      )}

      {/* ゲームのメイン画面 */}
      {gameStarted && (
        <>
          <Rules /> {/* ルール表示ボタン */}
          <h2>合計値: {currentSum}</h2>
          <div className="scores">
            {Object.entries(scores).map(([player, score]) => (
              <p key={player}>
                {player}: {score}ポイント
              </p>
            ))}
          </div>
          {players.map((player, index) => (
            index === currentPlayerIndex && (
              <Player key={player.id} player={player} onPlayCard={handleCardClick} />
            )
          ))}
          {gameOver && !gameEnd && (
            <div>
              <h2>ラウンド終了! 次のラウンドを始めます。</h2>
              <button onClick={resetRound}>次のラウンド</button>
            </div>
          )}
          {gameEnd && (
            <GameResult scores={scores} winner={winner} onRestart={restartGame} /> // 結果ポップアップ
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
>>>>>>> 611379e (Initial commit without node_modules)

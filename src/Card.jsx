import React from 'react';
//import './Card.css'; // カスタムCSSファイルを使用

const Card = ({ card, onClick }) => {
  // カードのマークとクラスを決めるための関数
  const getCardDetails = (value) => {
    switch (value) {
      case 0:
        return { symbol: '♣', className: 'clover' }; // クローバー
      case 1:
        return { symbol: '♦', className: 'diamond' }; // ダイヤ
      case 2:
        return { symbol: '♥', className: 'heart' }; // ハート
      case 3:
        return { symbol: '♠', className: 'spade' }; // スペード
      default:
        return { symbol: '', className: '' };
    }
  };

  const { symbol, className } = getCardDetails(card.value);
  const cardClass = `card ${className}`;

  return (
    <div className={cardClass} onClick={() => onClick(card)}>
      <div className="card-content">
        <span className="card-symbol">{symbol}</span>
        <span className="card-value">{card.value}</span>
      </div>
    </div>
  );
};

export default Card;
import React from 'react';
// import './Card.css'; // 必要に応じてCSSファイルを使用
import cardBackImage from './card-back.png';

const Card = ({ card, onClick }) => {
  const getCardDetails = (value) => {
    switch (value) {
      case 0:
        return { symbol: '♣', className: 'clover' };
      case 1:
        return { symbol: '♦', className: 'diamond' };
      case 2:
        return { symbol: '♥', className: 'heart' };
      case 3:
        return { symbol: '♠', className: 'spade' };
      default:
        return { symbol: '', className: '' };
    }
  };

  const { symbol, className } = getCardDetails(card.value);
  const cardClass = `card ${className}`;

  return (
    <div className={cardClass} onClick={() => onClick(card)}>
      <div className="card-content">
        {card.isFaceUp ? (
          <>
            <span className="card-symbol">{symbol}</span>
            <span className="card-value">{card.value}</span>
          </>
        ) : (
          <img src={cardBackImage} alt="裏面" className="card-back" />
        )}
      </div>
    </div>
  );
};

export default Card;
<<<<<<< HEAD
import React from 'react';
import Card from './Card';

const Player = ({ player, onPlayCard }) => {
  return (
    <div className="player">
      <h2>{player.name}</h2>
      <div className="hand">
        {player.hand.map((card) => (
          <Card key={card.id} card={card} onClick={() => onPlayCard(player.id, card)} />
        ))}
      </div>
    </div>
  );
};

=======
import React from 'react';
import Card from './Card';

const Player = ({ player, onPlayCard }) => {
  return (
    <div className="player">
      <h2>{player.name}</h2>
      <div className="hand">
        {player.hand.map((card) => (
          <Card key={card.id} card={card} onClick={() => onPlayCard(player.id, card)} />
        ))}
      </div>
    </div>
  );
};

>>>>>>> 611379e (Initial commit without node_modules)
export default Player;
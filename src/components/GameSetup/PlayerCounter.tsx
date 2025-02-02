import React from "react";

interface PlayerCounterProps {
  numPlayers: number;
  setNumPlayers: (count: number) => void;
}

const PlayerCounter: React.FC<PlayerCounterProps> = ({
  numPlayers,
  setNumPlayers
}) => {
  const handlePlayerCountChange = (change: number) => {
    const newCount = numPlayers + change;
    if (newCount >= 3 && newCount <= 12) {
      setNumPlayers(newCount);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Number of Players</h2>
      <p className="text-sm text-gray-600 mb-2">
        Minimum: 3 players | Maximum: 12 players
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handlePlayerCountChange(-1)}
          disabled={numPlayers <= 3}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          -
        </button>
        <span className="text-xl font-bold">{numPlayers}</span>
        <button
          onClick={() => handlePlayerCountChange(1)}
          disabled={numPlayers >= 12}
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PlayerCounter;
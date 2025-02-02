import React from "react";
import { Player } from "../../types";

interface PlayerNamesProps {
  players: Player[];
  onPlayerNameChange: (index: number, name: string) => void;
}

const PlayerNames: React.FC<PlayerNamesProps> = ({
  players,
  onPlayerNameChange
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Enter Player Names</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player, index) => (
          <div key={player.id}>
            <label
              htmlFor={`player-${player.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Player {player.id}:
            </label>
            <input
              id={`player-${player.id}`}
              type="text"
              value={player.name}
              onChange={(e) => onPlayerNameChange(index, e.target.value)}
              placeholder={`Player ${player.id}`}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerNames;
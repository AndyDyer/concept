import React, { useState } from "react";
import { Player } from "../../types/index.ts";
import { AI_MODELS } from "../../lib/ai.ts";
import { Button } from "../ui/button.tsx";

interface GameSetupProps {
  onStartGame: (players: Player[], currentExplainer: Player) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  // Initialize with 3 players, where Player 2 and Player 3 are AI
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Andy", score: 0 },
    { id: 2, name: "Grok 1", score: 0, isAI: true, aiModel: AI_MODELS.GROK_2 },
    { id: 3, name: "Grok 2", score: 0, isAI: true, aiModel: AI_MODELS.GROK_2 }
  ]);

  const handlePlayerNameChange = (index: number, name: string) => {
    const updatedPlayers = [...players];
    // Don't allow changing AI player's name
    if (updatedPlayers[index].isAI) return;
    updatedPlayers[index] = { ...updatedPlayers[index], name };
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    onStartGame(players, players[1]); // Start with Grok 1 (AI) as explainer
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Concept!</h1>
          <p className="text-gray-600">A game of visual communication and deduction</p>
        </div>

        {/* Game Rules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Play</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Roles */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-600">The Roles</h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="font-semibold">Explainer:</span>
                  <ul className="list-disc ml-5 text-sm">
                    <li>Gets a secret word to communicate</li>
                    <li>Places markers and cubes on icons</li>
                    <li>Cannot speak or gesture</li>
                    <li>Earns 1 point when word is guessed</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold">Guesser:</span>
                  <ul className="list-disc ml-5 text-sm">
                    <li>Interprets the visual clues</li>
                    <li>Makes guesses in the chat</li>
                    <li>First correct guess earns 2 points</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Game Pieces */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-600">The Pieces</h3>
              <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="font-semibold">Main Concept (Green ?):</span>
                  <ul className="list-disc ml-5 text-sm">
                    <li>Represents the primary category</li>
                    <li>Must be placed first</li>
                    <li>Only one allowed at a time</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold">Sub-Concepts:</span>
                  <ul className="list-disc ml-5 text-sm">
                    <li>Markers (!): One per color</li>
                    <li>Cubes (■): Up to 8 per color</li>
                    <li>Colors: Blue, Red, Purple, Black</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600">Example: "Eiffel Tower"</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>
                  <span className="font-semibold">Main Concept (Green ?):</span>
                  <br />
                  Place on "Building" - This is a structure
                </li>
                <li>
                  <span className="font-semibold">Blue Marker (!) and Cubes:</span>
                  <br />
                  Place on "Metal" with 3 cubes - It's made of metal
                </li>
                <li>
                  <span className="font-semibold">Red Marker (!):</span>
                  <br />
                  Place on "Location" - It's in a specific place
                </li>
                <li>
                  <span className="font-semibold">Purple Marker (!) and Cubes:</span>
                  <br />
                  Place on "Tall" with 2 cubes - It's very high
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Player Setup */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Player Setup</h2>
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded ${
                    player.isAI ? 'bg-gray-100' : ''
                  }`}
                  placeholder={player.isAI ? `Grok ${index}` : "Enter your name"}
                  disabled={player.isAI}
                />
                {player.isAI && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    AI
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartGame}
            disabled={!players[0].name.trim()}
            className="w-full"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;

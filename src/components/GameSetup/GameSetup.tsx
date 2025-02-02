import React, { useState } from "react";
import { Player } from "../../types/index.ts";
import { AI_MODELS } from "../../lib/ai.ts";
import { Button } from "../ui/button.tsx";
import { ScrollArea } from "../ui/scroll-area.tsx";
import { Input } from "../ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.tsx";
import { Label } from "../ui/label.tsx";

interface GameSetupProps {
  onStartGame: (players: Player[], currentExplainer: Player) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  // Initialize with 3 players: 1 human and 2 AI
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Andy", score: 0 },
    {
      id: 2,
      name: "Grok 1",
      score: 0,
      isAI: true,
      aiModel: AI_MODELS.GROK_2,
    },
    {
      id: 3,
      name: "Grok 2",
      score: 0,
      isAI: true,
      aiModel: AI_MODELS.GROK_2,
    },
  ]);

  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [firstExplainer, setFirstExplainer] = useState<string>("2"); // Default to Grok 1

  const handlePlayerNameChange = (index: number, name: string) => {
    const updatedPlayers = [...players];
    // Don't allow changing AI player's name
    if (updatedPlayers[index].isAI) return;
    updatedPlayers[index] = { ...updatedPlayers[index], name };
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    // Validate API key
    if (!apiKey.trim()) {
      setApiKeyError("API key is required");
      return;
    }

    // Update AI players with API key
    const playersWithApiKey = players.map((player) => {
      if (player.isAI) {
        return { ...player, apiKey };
      }
      return player;
    });

    // Find selected explainer
    const selectedExplainer = playersWithApiKey.find(
      (p) => p.id === parseInt(firstExplainer),
    );
    if (!selectedExplainer) {
      console.error("Selected explainer not found");
      return;
    }

    onStartGame(playersWithApiKey, selectedExplainer);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Concept!</h1>
          <p className="text-gray-600">
            A game of visual communication and deduction
          </p>
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
              <h3 className="text-lg font-semibold text-purple-600">
                The Pieces
              </h3>
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
            <h3 className="text-lg font-semibold text-green-600">
              Example: "Eiffel Tower"
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <ol className="list-decimal ml-5 space-y-2 text-sm">
                <li>
                  <span className="font-semibold">Main Concept (Green ?):</span>
                  <br />
                  Place on "Building" - This is a structure
                </li>
                <li>
                  <span className="font-semibold">
                    Blue Marker (!) and Cubes:
                  </span>
                  <br />
                  Place on "Metal" with 3 cubes - It's made of metal
                </li>
                <li>
                  <span className="font-semibold">Red Marker (!):</span>
                  <br />
                  Place on "Location" - It's in a specific place
                </li>
                <li>
                  <span className="font-semibold">
                    Purple Marker (!) and Cubes:
                  </span>
                  <br />
                  Place on "Tall" with 2 cubes - It's very high
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Player Setup */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Game Setup</h2>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              XAI API Key
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setApiKeyError("");
              }}
              placeholder="Enter your XAI API key"
              className={apiKeyError ? "border-red-500" : ""}
            />
            {apiKeyError && (
              <p className="text-sm text-red-500">{apiKeyError}</p>
            )}
          </div>

          {/* Player Names */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Players</h3>
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                  className={`flex-1 ${player.isAI ? "bg-gray-100" : ""}`}
                  placeholder={
                    player.isAI ? `Grok ${index}` : "Enter your name"
                  }
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

          {/* First Explainer Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Who goes first as explainer?
            </h3>
            <RadioGroup
              value={firstExplainer}
              onValueChange={setFirstExplainer}
              className="grid grid-cols-1 gap-4"
            >
              {players.map((player) => (
                <div key={player.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={player.id.toString()}
                    id={`player-${player.id}`}
                  />
                  <Label
                    htmlFor={`player-${player.id}`}
                    className="font-medium"
                  >
                    {player.name} {player.isAI ? "(AI)" : ""}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            onClick={handleStartGame}
            disabled={!players[0].name.trim() || !apiKey.trim()}
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

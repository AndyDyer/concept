import React from "react";
import { Player } from "../../types/index.ts";
import CurrentPlayer from "./CurrentPlayer.tsx";
import WordCard from "./WordCard.tsx";
import GuessInput from "./GuessInput.tsx";
import Timer from "./Timer.tsx";

interface GameControlsProps {
  currentExplainer: Player;
  currentPlayer: Player;
  word: string;
  onGuess: (guess: string) => void;
  initialTime: number;
  onTimeUp: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentExplainer,
  currentPlayer,
  word,
  onGuess,
  initialTime,
  onTimeUp
}) => {
  const isExplainer = currentExplainer.id === currentPlayer.id;

  return (
    <div className="space-y-4">
      <CurrentPlayer
        currentExplainer={currentExplainer}
        currentPlayer={currentPlayer}
      />
      <WordCard word={word} isExplainer={isExplainer} />
      <Timer initialTime={initialTime} onTimeUp={onTimeUp} />
      <GuessInput onGuess={onGuess} disabled={isExplainer} />
    </div>
  );
};

export default GameControls;
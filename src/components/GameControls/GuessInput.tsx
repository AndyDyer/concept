import React, { useState } from "react";

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled?: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled = false }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess.trim());
      setGuess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "You are the explainer" : "Enter your guess"}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={disabled || !guess.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Guess
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
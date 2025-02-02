import React from "react";

interface WordCardProps {
  word: string;
  isExplainer: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, isExplainer }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        {isExplainer ? "Your Word to Explain:" : "Try to guess the word!"}
      </h2>
      {isExplainer && (
        <p className="text-xl font-bold text-blue-600">{word}</p>
      )}
    </div>
  );
};

export default WordCard;
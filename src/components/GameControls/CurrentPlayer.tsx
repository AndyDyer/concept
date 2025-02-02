import React from "react";
import { Player } from "../../types";

interface CurrentPlayerProps {
  currentExplainer: Player;
  currentPlayer: Player;
}

const CurrentPlayer: React.FC<CurrentPlayerProps> = ({
  currentExplainer,
  currentPlayer
}) => {
  const isExplainer = currentExplainer.id === currentPlayer.id;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Current Explainer</h2>
      <p className="text-xl">
        {currentExplainer.name}
        {isExplainer && " (You)"}
      </p>
    </div>
  );
};

export default CurrentPlayer;
import React from "react";
import { useBoard } from "../../state/BoardContext.tsx";

interface GamePieceControlsProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  pieceType: "marker" | "cube";
  setPieceType: (type: "marker" | "cube") => void;
}

const GamePieceControls: React.FC<GamePieceControlsProps> = ({
  selectedColor,
  onColorSelect,
  pieceType,
  setPieceType,
}) => {
  const { state: boardState, clearBoard } = useBoard();

  // Count pieces used for each color
  const markerCount = {
    green: boardState.mainConcept ? 1 : 0,
    blue: boardState.subConcepts.filter((c) => c.color === "blue" && c.isMarker)
      .length,
    red: boardState.subConcepts.filter((c) => c.color === "red" && c.isMarker)
      .length,
    purple: boardState.subConcepts.filter(
      (c) => c.color === "purple" && c.isMarker,
    ).length,
    black: boardState.subConcepts.filter(
      (c) => c.color === "black" && c.isMarker,
    ).length,
  };

  const cubeCount = {
    blue: boardState.subConcepts.filter(
      (c) => c.color === "blue" && !c.isMarker,
    ).length,
    red: boardState.subConcepts.filter((c) => c.color === "red" && !c.isMarker)
      .length,
    purple: boardState.subConcepts.filter(
      (c) => c.color === "purple" && !c.isMarker,
    ).length,
    black: boardState.subConcepts.filter(
      (c) => c.color === "black" && !c.isMarker,
    ).length,
  };

  const colors =
    pieceType === "marker"
      ? [
          { name: "green", marker: "?" },
          { name: "blue", marker: "!" },
          { name: "red", marker: "!" },
          { name: "purple", marker: "!" },
          { name: "black", marker: "!" },
        ]
      : [
          { name: "blue", marker: "■" },
          { name: "red", marker: "■" },
          { name: "purple", marker: "■" },
          { name: "black", marker: "■" },
        ];

  return (
    <div className="fixed left-[32.5%] bottom-12 translate-x-[-50%] z-50">
      <div className="game-container p-4">
        <div className="flex items-center gap-6">
          {/* Piece Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setPieceType("marker")}
              className={`px-4 py-2 rounded-full transition-colors ${
                pieceType === "marker"
                  ? "bg-pink-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Markers
            </button>
            <button
              onClick={() => setPieceType("cube")}
              className={`px-4 py-2 rounded-full transition-colors ${
                pieceType === "cube"
                  ? "bg-pink-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Cubes
            </button>
          </div>

          <div className="flex gap-3">
            {colors.map(({ name, marker }) => {
              const count =
                pieceType === "marker"
                  ? markerCount[name as keyof typeof markerCount]
                  : cubeCount[name as keyof typeof cubeCount];
              const limit = pieceType === "marker" ? 1 : 8;
              const isDisabled = count >= limit;

              return (
                <div
                  key={`${name}-${pieceType}`}
                  className="flex flex-col items-center gap-1"
                >
                  <button
                    onClick={() => !isDisabled && onColorSelect(name)}
                    disabled={isDisabled}
                    className={`
                      w-12 h-12 rounded-full border-2 flex items-center justify-center text-white font-bold text-xl
                      ${selectedColor === name ? "ring-4 ring-pink-500 ring-offset-2" : ""}
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110 transition-transform"}
                    `}
                    style={{
                      backgroundColor:
                        name === "purple"
                          ? "#8b5cf6"
                          : name === "blue"
                            ? "#3b82f6"
                            : name === "red"
                              ? "#ef4444"
                              : name === "green"
                                ? "#10b981"
                                : name === "black"
                                  ? "#6b7280"
                                  : name,
                    }}
                  >
                    {marker}
                  </button>

                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      {count}/{limit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear Board Button */}
          <button
            onClick={clearBoard}
            className="px-4 py-2 bg-red-500 text-black rounded-full hover:bg-red-600 transition-colors"
          >
            Clear Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePieceControls;

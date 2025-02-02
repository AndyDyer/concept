import React from "react";
import GameSection from "./GameSection.tsx";
import GamePieceControls from "./GameBoard/GamePieceControls.tsx";
import { IconsData } from "../types/index.ts";
import { useGame } from "../state/GameContext.tsx";
import { useBoard } from "../state/BoardContext.tsx";

interface GameBoardProps {
  iconsData: IconsData;
  onPlaceMainConcept: (iconKey: string) => void;
  onPlaceSubConcept: (
    iconKey: string,
    color: string,
    isMarker?: boolean,
  ) => void;
  showDescriptions: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  iconsData,
  onPlaceMainConcept,
  onPlaceSubConcept,
  showDescriptions,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<string>("green");
  const [pieceType, setPieceType] = React.useState<"marker" | "cube">("marker");
  const { state: gameState } = useGame();
  const { state: boardState, removePiece } = useBoard();

  // Get current player
  const currentPlayer = gameState.players[0];
  const isExplainer = gameState.currentExplainer?.id === currentPlayer.id;

  const handleIconClick = (category: string, iconKey: string) => {
    // Only allow placing pieces if you're the explainer
    if (!isExplainer) return;

    if (selectedColor === "green") {
      // If there's already a main concept, remove it first
      if (boardState.mainConcept) {
        onPlaceMainConcept("");
      }
      onPlaceMainConcept(`${category}:${iconKey}`);
      return;
    }

    // For other colors, check if we're placing a marker or cube
    const isMarker = pieceType === "marker";
    const existingPieces = boardState.subConcepts.filter(
      (c) => c.color === selectedColor && c.isMarker === isMarker,
    );

    // Check limits based on piece type
    const limit = isMarker ? 1 : 8;
    if (existingPieces.length < limit) {
      onPlaceSubConcept(`${category}:${iconKey}`, selectedColor, isMarker);
    }
  };

  const handleIconRightClick = (category: string, iconKey: string) => {
    // Only allow removing pieces if you're the explainer
    if (!isExplainer) return;
    removePiece(`${category}:${iconKey}`);
  };

  const getIconPieces = (category: string, iconKey: string) => {
    const pieces = [];
    const fullKey = `${category}:${iconKey}`;

    // Add main concept if it matches
    if (boardState.mainConcept === fullKey) {
      pieces.push({ color: "green", isMarker: true });
    }

    // Add sub concepts
    boardState.subConcepts.forEach((concept) => {
      if (concept.iconKey === fullKey) {
        pieces.push({
          color: concept.color,
          isMarker: concept.isMarker || false,
        });
      }
    });

    return pieces;
  };

  // Get categories
  const physicalObjects = ["physical_objects", iconsData["physical_objects"]];
  const nature = ["nature", iconsData["nature"]];
  const colors = ["colors", iconsData["colors"]];
  const livingBeings = ["living_beings", iconsData["living_beings"]];
  const humanActivities = ["human_activities", iconsData["human_activities"]];
  const abstractConcepts = [
    "abstract_concepts",
    iconsData["abstract_concepts"],
  ];

  return (
    <div className="relative h-full flex flex-col">
      {/* Only show controls if you're the explainer */}
      {isExplainer && (
        <GamePieceControls
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          pieceType={pieceType}
          setPieceType={setPieceType}
          boardState={boardState}
        />
      )}

      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md flex-1 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex gap-4 flex-[2]">
          {/* Physical Objects - Left side */}
          <div className="w-1/4">
            <GameSection
              key={physicalObjects[0]}
              title={physicalObjects[0]}
              icons={physicalObjects[1]}
              onIconClick={(iconKey) =>
                handleIconClick(physicalObjects[0], iconKey)
              }
              onIconRightClick={(iconKey) =>
                handleIconRightClick(physicalObjects[0], iconKey)
              }
              showDescriptions={showDescriptions}
              getIconPieces={(iconKey) =>
                getIconPieces(physicalObjects[0], iconKey)
              }
              isInteractive={isExplainer}
              orientation="vertical"
              width="compact"
              isExplainer={isExplainer}
            />
          </div>

          {/* Nature & Colors - Combined box */}
          <div className="w-1/4 flex flex-col gap-2">
            <GameSection
              key={nature[0]}
              title={nature[0]}
              icons={nature[1]}
              onIconClick={(iconKey) => handleIconClick(nature[0], iconKey)}
              onIconRightClick={(iconKey) =>
                handleIconRightClick(nature[0], iconKey)
              }
              showDescriptions={showDescriptions}
              getIconPieces={(iconKey) => getIconPieces(nature[0], iconKey)}
              isInteractive={isExplainer}
              orientation="horizontal"
              isExplainer={isExplainer}
              width="compact"
            />
            <GameSection
              key={colors[0]}
              title={colors[0]}
              icons={colors[1]}
              onIconClick={(iconKey) => handleIconClick(colors[0], iconKey)}
              onIconRightClick={(iconKey) =>
                handleIconRightClick(colors[0], iconKey)
              }
              showDescriptions={showDescriptions}
              getIconPieces={(iconKey) => getIconPieces(colors[0], iconKey)}
              isInteractive={isExplainer}
              orientation="horizontal"
              isExplainer={isExplainer}
              width="compact"
            />
          </div>

          {/* Living Beings */}
          <div className="w-1/4">
            <GameSection
              key={livingBeings[0]}
              title={livingBeings[0]}
              icons={livingBeings[1]}
              onIconClick={(iconKey) =>
                handleIconClick(livingBeings[0], iconKey)
              }
              onIconRightClick={(iconKey) =>
                handleIconRightClick(livingBeings[0], iconKey)
              }
              showDescriptions={showDescriptions}
              getIconPieces={(iconKey) =>
                getIconPieces(livingBeings[0], iconKey)
              }
              isInteractive={isExplainer}
              orientation="vertical"
              isExplainer={isExplainer}
              width="compact"
            />
          </div>

          {/* Human Activities */}
          <div className="w-1/4">
            <GameSection
              key={humanActivities[0]}
              title={humanActivities[0]}
              icons={humanActivities[1]}
              onIconClick={(iconKey) =>
                handleIconClick(humanActivities[0], iconKey)
              }
              onIconRightClick={(iconKey) =>
                handleIconRightClick(humanActivities[0], iconKey)
              }
              showDescriptions={showDescriptions}
              getIconPieces={(iconKey) =>
                getIconPieces(humanActivities[0], iconKey)
              }
              isInteractive={isExplainer}
              orientation="vertical"
              isExplainer={isExplainer}
              width="compact"
            />
          </div>
        </div>

        {/* Bottom row - Abstract Concepts */}
        <div className="flex-1">
          <GameSection
            key={abstractConcepts[0]}
            title={abstractConcepts[0]}
            icons={abstractConcepts[1]}
            onIconClick={(iconKey) =>
              handleIconClick(abstractConcepts[0], iconKey)
            }
            onIconRightClick={(iconKey) =>
              handleIconRightClick(abstractConcepts[0], iconKey)
            }
            showDescriptions={showDescriptions}
            getIconPieces={(iconKey) =>
              getIconPieces(abstractConcepts[0], iconKey)
            }
            isInteractive={isExplainer}
            orientation="horizontal"
            isExplainer={isExplainer}
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

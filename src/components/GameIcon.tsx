import React from "react";
import { cn } from "../lib/utils.ts";

interface GameIconProps {
  description: string[];
  icon: React.ReactNode;
  onClick?: () => void;
  onContextMenu?: () => void;
  showDescription: boolean;
  pieces?: Array<{
    color: string;
    isMarker: boolean;
    count?: number;
  }>;
  isInteractive?: boolean;
  backgroundColor?: string;
  isExplainer: boolean;
}

const GameIcon: React.FC<GameIconProps> = ({
  description,
  icon,
  onClick,
  onContextMenu,
  showDescription,
  pieces = [],
  isInteractive = false,
  backgroundColor,
  isExplainer,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu?.();
  };

  // Group pieces by type and color
  const mainConcept = pieces.find((p) => p.color === "green" && p.isMarker);
  const subMarkers = pieces.filter((p) => p.isMarker && p.color !== "green");
  const cubes = pieces
    .filter((p) => !p.isMarker)
    .reduce(
      (acc, piece) => {
        if (!acc[piece.color]) {
          acc[piece.color] = { count: 0, color: piece.color };
        }
        acc[piece.color].count++;
        return acc;
      },
      {} as Record<string, { count: number; color: string }>,
    );

  // Determine if the icon should be transparent
  const hasMarker =
    mainConcept || subMarkers.length > 0 || Object.keys(cubes).length > 0;
  const transparencyStyle = !isExplainer && !hasMarker ? { opacity: 0.2 } : {};

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={transparencyStyle}>
        <button
          onClick={onClick}
          onContextMenu={handleContextMenu}
          className={cn(
            "icon-button w-[48px] h-[48px] flex items-center justify-center group/tooltip transition-all duration-200",
            isInteractive && "hover:scale-105 cursor-pointer",
            !isInteractive && "cursor-default",
          )}
          style={{ backgroundColor }}
        >
          {/* Main icon */}
          <div className="absolute inset-0 flex items-center justify-center scale-75">
            {icon}
          </div>

          {/* Markers container at top */}
          <div className="absolute -top-2 left-0 right-0 flex justify-center items-center gap-1">
            {/* Left sub-markers */}
            <div className="flex justify-end gap-1 flex-1">
              {subMarkers.slice(0, 2).map((piece, index) => (
                <div
                  key={`left-marker-${index}`}
                  className="flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    backgroundColor: piece.color,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                >
                  !
                </div>
              ))}
            </div>

            {/* Main Concept (centered) */}
            {mainConcept && (
              <div
                className="flex items-center justify-center text-white font-bold text-sm z-10"
                style={{
                  backgroundColor: "green",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                }}
              >
                ?
              </div>
            )}

            {/* Right sub-markers */}
            <div className="flex justify-start gap-1 flex-1">
              {subMarkers.slice(2, 4).map((piece, index) => (
                <div
                  key={`right-marker-${index}`}
                  className="flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    backgroundColor: piece.color,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                >
                  !
                </div>
              ))}
            </div>
          </div>

          {/* Cube counts (positioned at bottom) */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
            {Object.values(cubes).map(({ color, count }, index) => (
              <div
                key={`cube-${index}`}
                className="flex items-center justify-center text-white font-bold text-xs"
                style={{
                  backgroundColor: color,
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                }}
              >
                {count}
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {!showDescription && (
            <div className="pointer-events-none absolute opacity-0 group-hover/tooltip:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-opacity duration-200 z-50">
              <div className="flex flex-col items-center gap-1">
                {description.map((desc, index) => (
                  <span
                    key={index}
                    className="whitespace-nowrap bg-gray-100 text-xs rounded-full px-2 py-0.5"
                  >
                    {desc}
                  </span>
                ))}
              </div>
              {/* Arrow */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
            </div>
          )}
        </button>
      </div>

      {/* Permanent description if showDescription is true */}
      {showDescription && (
        <div className="flex flex-wrap justify-center gap-1 max-w-[48px] mt-1">
          {description.map((desc, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-xs rounded-full px-1.5 py-0.5 text-[8px]"
            >
              {desc}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameIcon;

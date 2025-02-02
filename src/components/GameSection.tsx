import React from "react";
import GameIcon from "./GameIcon.tsx";
import { IconCategory } from "../types/index.ts";
import { cn } from "../lib/utils.ts";

interface GameSectionProps {
  title: string;
  icons: IconCategory;
  onIconClick?: (iconKey: string) => void;
  onIconRightClick?: (iconKey: string) => void;
  showDescriptions: boolean;
  getIconPieces: (iconKey: string) => Array<{
    color: string;
    isMarker: boolean;
    count?: number;
  }>;
  isInteractive: boolean;
  orientation: "vertical" | "horizontal";
  width?: "compact" | "full";
  isExplainer: boolean;
}

// Category-specific colors with low opacity for backgrounds
const categoryColors: Record<string, string> = {
  physical_objects: "bg-slate-50/50",
  nature: "bg-emerald-50/50",
  living_beings: "bg-pink-50/50",
  human_activities: "bg-amber-50/50",
  abstract_concepts: "bg-purple-50/50",
};

const GameSection: React.FC<GameSectionProps> = ({
  title,
  icons,
  onIconClick,
  onIconRightClick,
  showDescriptions,
  getIconPieces,
  isInteractive,
  isExplainer,
  width = "compact",
}) => {
  const iconEntries = Object.entries(icons);
  const gridCols = width === "compact" ? 4 : 12; // 4 columns for compact sections, 12 for full width

  return (
    <div
      className={cn(
        "flex-1 rounded-2xl p-3 transition-all duration-300 h-full flex flex-col",
        width === "compact" ? "w-[280px]" : "w-full",
        categoryColors[title] || "bg-gray-50/50",
      )}
    >
      <h2 className="text-sm font-semibold mb-2 capitalize px-2 bg-white/80 backdrop-blur-sm py-1 rounded-lg shadow-sm">
        {title.replace(/_/g, " ")}
      </h2>
      <div
        className={cn(
          "grid gap-1 flex-1",
          width === "compact" ? "grid-cols-4" : "grid-cols-12",
        )}
      >
        {iconEntries.map(([key, { description, icon, backgroundColor }]) => (
          <div key={key} className="flex justify-center items-center">
            <GameIcon
              description={description}
              icon={icon}
              onClick={isInteractive ? () => onIconClick?.(key) : undefined}
              onContextMenu={
                isInteractive ? () => onIconRightClick?.(key) : undefined
              }
              showDescription={showDescriptions}
              pieces={getIconPieces(key)}
              isInteractive={isInteractive}
              backgroundColor={backgroundColor}
              isExplainer={isExplainer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSection;

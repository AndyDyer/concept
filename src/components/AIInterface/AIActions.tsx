import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.tsx";
import { Button } from "../../components/ui/button.tsx";
import { ScrollArea } from "../../components/ui/scroll-area.tsx";
import { useGame } from "../../state/GameContext.tsx";
import { useBoard } from "../../state/BoardContext.tsx";
import { useChat } from "../../state/ChatContext.tsx";
import { explainerSystemPrompt } from "../../prompts/explainer.ts";
import { guesserSystemPrompt } from "../../prompts/guesser.ts";
import { generateExplanation, generateGuess } from "../../lib/ai.ts";

const AIActions: React.FC = () => {
  const { state: gameState } = useGame();
  const {
    state: boardState,
    placeMainConcept,
    placeSubConcept,
    clearBoard,
  } = useBoard();
  const { addMessage, state: chatState } = useChat();
  const [role, setRole] = useState<"explainer" | "guesser">("explainer"); // Start as explainer
  const [isLoading, setIsLoading] = useState(false);
  const [lastActionTime, setLastActionTime] = useState(0);
  const COOLDOWN_TIME = 2000; // 2 seconds cooldown between actions

  // Get AI player info
  const aiPlayer = gameState.players.find((p) => p.isAI);

  // Auto-run AI actions when it's AI's turn
  useEffect(() => {
    if (!aiPlayer || isLoading || Date.now() - lastActionTime < COOLDOWN_TIME)
      return;

    const isAITurn = gameState.currentExplainer?.isAI;
    const shouldAct =
      (isAITurn && role === "explainer") || (!isAITurn && role === "guesser");

    if (shouldAct) {
      console.log("[AI] Auto-running action:", role);
      handleGetCompletion();
    }
  }, [
    gameState.currentExplainer,
    boardState.mainConcept,
    boardState.subConcepts,
  ]);

  // Format game state in a more natural, text-based way
  const formatGameState = () => {
    const lines: string[] = [];

    // For explainer, include the word
    if (role === "explainer" && gameState.currentExplainer?.isAI) {
      lines.push(`Word to explain: "${gameState.currentWord}"`);
      lines.push("");
    }

    // Current board state
    lines.push("# Current Board State");
    lines.push("");

    // Main concept
    if (boardState.mainConcept) {
      const [category, key] = boardState.mainConcept.split(":");
      const iconInfo = boardState.iconsData[category]?.[key];
      lines.push(
        `Main concept (green ?) on ${boardState.mainConcept} [${iconInfo?.description.join(", ")}]`,
      );
    } else {
      lines.push("No main concept placed yet");
    }

    // Group sub-concepts by color
    const subConceptsByColor = boardState.subConcepts.reduce(
      (acc, concept) => {
        if (!acc[concept.color]) {
          acc[concept.color] = {
            markers: [],
            cubes: new Map(),
          };
        }

        if (concept.isMarker) {
          acc[concept.color].markers.push(concept.iconKey);
        } else {
          const count = acc[concept.color].cubes.get(concept.iconKey) || 0;
          acc[concept.color].cubes.set(concept.iconKey, count + 1);
        }

        return acc;
      },
      {} as Record<
        string,
        {
          markers: string[];
          cubes: Map<string, number>;
        }
      >,
    );

    // Add sub-concepts by color
    Object.entries(subConceptsByColor).forEach(
      ([color, { markers, cubes }]) => {
        lines.push("");
        if (markers.length > 0) {
          const markerDescriptions = markers.map((iconKey) => {
            const [category, key] = iconKey.split(":");
            const iconInfo = boardState.iconsData[category]?.[key];
            return `${iconKey} [${iconInfo?.description.join(", ")}]`;
          });
          lines.push(
            `${color} marker (!) on: ${markerDescriptions.join(", ")}`,
          );
        }
        if (cubes.size > 0) {
          const cubeDescriptions = Array.from(cubes.entries()).map(
            ([iconKey, count]) => {
              const [category, key] = iconKey.split(":");
              const iconInfo = boardState.iconsData[category]?.[key];
              return `${count} on ${iconKey} [${iconInfo?.description.join(", ")}]`;
            },
          );
          lines.push(`${color} cubes: ${cubeDescriptions.join(", ")}`);
        }
      },
    );

    return lines.join("\n");
  };

  const handleGetCompletion = async () => {
    if (!aiPlayer) {
      console.error("No AI player found in game state");
      return;
    }

    try {
      setIsLoading(true);
      console.log("[AI] Getting completion for role:", role);

      // Combine game and board state for AI
      const combinedState = {
        ...gameState,
        ...boardState,
        messages: chatState.messages.map((m) => m.text),
        iconsData: boardState.iconsData,
      };

      // Get AI completion based on role
      const response =
        role === "explainer"
          ? await generateExplanation(
              combinedState,
              explainerSystemPrompt,
              placeMainConcept,
              placeSubConcept,
              clearBoard,
              addMessage,
            )
          : await generateGuess(combinedState, guesserSystemPrompt, addMessage);

      console.log("[AI] Response:", response);
      setLastActionTime(Date.now());
    } catch (error) {
      console.error("Error getting AI completion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <Select
            value={role}
            onValueChange={(value: "explainer" | "guesser") => setRole(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="explainer">Explainer</SelectItem>
              <SelectItem value="guesser">Guesser</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Current Game State
          </label>
          <ScrollArea className="h-[200px] rounded-md border">
            <pre className="p-4 text-sm whitespace-pre-wrap font-mono">
              {formatGameState()}
            </pre>
          </ScrollArea>
        </div>

        <Button
          onClick={handleGetCompletion}
          className="w-full"
          disabled={isLoading || !aiPlayer}
        >
          {isLoading ? "Thinking..." : "Get AI Completion"}
        </Button>
      </div>
    </div>
  );
};

export default AIActions;

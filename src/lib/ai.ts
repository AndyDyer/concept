import { createXai } from "@ai-sdk/xai";
import { generateText, tool } from "ai";
import { z } from "zod";
import { GameState } from "../types/index.ts";

export const AI_MODELS = {
  GROK_2: "grok-2-1212",
} as const;

export type AIModel = keyof typeof AI_MODELS;

// Base AI Configuration
const BASE_AI_CONFIG = {
  temperature: 0.2,
  topK: 40,
  maxTokens: 200,
};

// Initial explanation config with higher maxSteps
const INITIAL_EXPLANATION_CONFIG = {
  ...BASE_AI_CONFIG,
  maxSteps: 8,
};

// Create tool factory with context updaters
const createTools = (
  gameState: GameState,
  placeMainConcept: (iconKey: string) => void,
  placeSubConcept: (iconKey: string, color: string, isMarker?: boolean) => void,
  clearBoard: () => void,
  addMessage: (message: any) => void,
  onCorrectGuess?: (playerId: number) => void,
) => ({
  // Explainer Tools
  explainerTools: {
    placeMainConcept: tool({
      description:
        "Places a green question mark (?) on the selected icon to establish the main concept",
      parameters: z.object({
        iconKey: z
          .string()
          .describe("The category:key identifier for the icon"),
      }),
      execute: async ({ iconKey }) => {
        console.log("[Tool] placeMainConcept called with:", { iconKey });
        console.log("[Tool] Current game state:", {
          mainConcept: gameState.mainConcept,
          currentWord: gameState.currentWord,
          currentExplainer: gameState.currentExplainer,
        });

        placeMainConcept(iconKey);

        console.log("[Tool] placeMainConcept completed");
        return {
          success: true,
          message: `Placed main concept on ${iconKey}`,
        };
      },
    }),

    placeSubConcept: tool({
      description: "Places either a marker (!) or cube on the selected icon",
      parameters: z.object({
        iconKey: z
          .string()
          .describe("The category:key identifier for the icon"),
        color: z
          .enum(["blue", "red", "purple", "black"])
          .describe("Color of the marker or cube"),
        isMarker: z.boolean().describe("True for marker (!), false for cube"),
      }),
      execute: async ({ iconKey, color, isMarker }) => {
        console.log("[Tool] placeSubConcept called with:", {
          iconKey,
          color,
          isMarker,
        });
        console.log("[Tool] Current sub-concepts:", gameState.subConcepts);

        placeSubConcept(iconKey, color, isMarker);

        console.log("[Tool] placeSubConcept completed");
        return {
          success: true,
          message: `Placed ${color} ${isMarker ? "marker" : "cube"} on ${iconKey}`,
        };
      },
    }),

    clearBoard: tool({
      description: "Removes all pieces from the board",
      parameters: z.object({}),
      execute: async () => {
        console.log("[Tool] clearBoard called");
        console.log("[Tool] Current board state:", {
          mainConcept: gameState.mainConcept,
          subConcepts: gameState.subConcepts,
        });

        clearBoard();

        console.log("[Tool] clearBoard completed");
        return {
          success: true,
          message: "Cleared the board",
        };
      },
    }),
  },

  // Guesser Tools
  guesserTools: {
    makeGuess: tool({
      description: "Make a guess for the current word",
      parameters: z.object({
        text: z.string().describe("The guessed word or phrase"),
        playerId: z.number().describe("Your player ID"),
      }),
      execute: async ({ text, playerId }) => {
        console.log("[Tool] makeGuess called with:", { text, playerId });
        console.log("[Tool] Current game state:", {
          currentWord: gameState.currentWord,
          currentExplainer: gameState.currentExplainer,
          players: gameState.players,
        });

        const player = gameState.players.find((p) => p.id === playerId);
        if (!player) {
          console.error("[Tool] Player not found:", playerId);
          return { success: false, message: "Player not found" };
        }

        const isCorrect =
          text.toLowerCase() === gameState.currentWord.toLowerCase();
        console.log("[Tool] Guess result:", { isCorrect });

        addMessage({
          id: Date.now(),
          playerId,
          playerName: player.name,
          text,
          timestamp: Date.now(),
          isCorrect,
          isAI: true,
        });

        // If guess is correct, trigger the round ending process
        if (isCorrect && onCorrectGuess) {
          onCorrectGuess(playerId);
        }

        console.log("[Tool] makeGuess completed");
        return {
          success: true,
          message: `Made guess: ${text}`,
          correct: isCorrect,
        };
      },
    }),
  },
});

interface AIResponse {
  text: string;
  toolCalls?: Array<{
    toolName: string;
    args: any;
  }>;
  toolResults?: Array<{
    toolName: string;
    result: any;
  }>;
}

export async function generateExplanation(
  gameState: GameState,
  systemPrompt: string,
  placeMainConcept: (iconKey: string) => void,
  placeSubConcept: (iconKey: string, color: string, isMarker?: boolean) => void,
  clearBoard: () => void,
  addMessage: (message: any) => void,
): Promise<AIResponse> {
  try {
    console.log("[AI] generateExplanation called");
    const currentExplainer = gameState.currentExplainer;
    if (!currentExplainer?.isAI || !currentExplainer.apiKey) {
      throw new Error("Current explainer is not AI or missing API key");
    }

    const xai = createXai({
      apiKey: currentExplainer.apiKey,
    });

    console.log("[AI] Game state:", {
      currentWord: gameState.currentWord,
      currentExplainer: gameState.currentExplainer,
      mainConcept: gameState.mainConcept,
      subConcepts: gameState.subConcepts,
    });

    let formattedState = formatGameState(gameState, "explainer");

    const priorGuesses = `Prior Guesses are  [${gameState.messages.join(", ")}] Use them to evaluate if your guessers are following what you are describing`;

    formattedState = `${formattedState}\n${priorGuesses}`;

    console.log("[AI] Formatted state:", formattedState);

    const { explainerTools } = createTools(
      gameState,
      placeMainConcept,
      placeSubConcept,
      clearBoard,
      addMessage,
    );

    // Use initial config with higher maxSteps if no main concept is set
    const config = !gameState.mainConcept
      ? INITIAL_EXPLANATION_CONFIG
      : { ...BASE_AI_CONFIG, maxSteps: 6 };
    console.log("[AI] Using config:", config);

    const response = await generateText({
      model: xai(AI_MODELS.GROK_2),
      system: systemPrompt,
      prompt: formattedState,
      tools: explainerTools,
      toolChoice: "required",
      ...config,
    });

    console.log("[AI] Explanation response:", response);
    return response;
  } catch (error) {
    console.error("[AI] Error generating explanation:", error);
    throw error;
  }
}

export async function generateGuess(
  gameState: GameState,
  systemPrompt: string,
  addMessage: (message: any) => void,
  onCorrectGuess: (playerId: number) => void,
): Promise<AIResponse> {
  try {
    console.log("[AI] generateGuess called");
    const currentAIPlayer = gameState.currentAIPlayer;
    if (!currentAIPlayer?.isAI || !currentAIPlayer.apiKey) {
      throw new Error("Current AI player is missing or has no API key");
    }

    const xai = createXai({
      apiKey: currentAIPlayer.apiKey,
    });

    console.log("[AI] Game state:", {
      currentWord: gameState.currentWord,
      currentExplainer: gameState.currentExplainer,
      mainConcept: gameState.mainConcept,
      subConcepts: gameState.subConcepts,
      currentAIPlayer: gameState.currentAIPlayer,
    });

    let formattedState = formatGameState(gameState, "guesser");
    const priorGuesses = `Prior Guesses are [${gameState.messages.join(", ")}] These are wrong so do not try them again`;
    formattedState = `${formattedState}\n${priorGuesses}`;

    console.log("[AI] Formatted state:", formattedState);

    const { guesserTools } = createTools(
      gameState,
      () => {}, // No board updates needed for guesser
      () => {}, // No board updates needed for guesser
      () => {}, // No board clearing needed for guesser
      addMessage,
      onCorrectGuess,
    );

    const response = await generateText({
      model: xai(AI_MODELS.GROK_2),
      system: systemPrompt,
      prompt: formattedState,
      tools: guesserTools,
      toolChoice: "required",
      ...BASE_AI_CONFIG,
    });

    console.log("[AI] Guess response:", response);
    return response;
  } catch (error) {
    console.error("[AI] Error generating guess:", error);
    throw error;
  }
}

function formatGameState(state: GameState, role: "explainer" | "guesser") {
  // For guessers, use the currentAIPlayer if available
  const aiPlayer =
    role === "guesser"
      ? state.currentAIPlayer
      : state.players.find(
          (p) => p.isAI && p.id === state.currentExplainer?.id,
        );

  if (!aiPlayer) {
    throw new Error("AI player not found in game state");
  }

  const lines: string[] = [];

  // Add AI player identity information
  lines.push(
    `You are ${aiPlayer.name} (ID: ${aiPlayer.id}), playing as ${role}.`,
  );
  lines.push("When making guesses, you must include your player ID.");
  lines.push("");

  // For explainer, include the word
  if (role === "explainer" && state.currentExplainer?.isAI) {
    lines.push(`Word to explain: "${state.currentWord}"`);
    lines.push("");
  }

  // Current board state
  lines.push("# Current Board State");
  lines.push("");

  // Main concept
  if (state.mainConcept) {
    const [category, key] = state.mainConcept.split(":");
    const iconInfo = state.iconsData[category]?.[key];
    lines.push(
      `Main concept (green ?) on ${state.mainConcept} [${iconInfo?.description.join(", ")}]`,
    );
  } else {
    lines.push("No main concept placed yet");
  }

  // Group sub-concepts by color
  const subConceptsByColor = state.subConcepts.reduce(
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
  Object.entries(subConceptsByColor).forEach(([color, { markers, cubes }]) => {
    lines.push("");
    if (markers.length > 0) {
      const markerDescriptions = markers.map((iconKey) => {
        const [category, key] = iconKey.split(":");
        const iconInfo = state.iconsData[category]?.[key];
        return `${iconKey} [${iconInfo?.description.join(", ")}]`;
      });
      lines.push(`${color} marker (!) on: ${markerDescriptions.join(", ")}`);
    }
    if (cubes.size > 0) {
      const cubeDescriptions = Array.from(cubes.entries()).map(
        ([iconKey, count]) => {
          const [category, key] = iconKey.split(":");
          const iconInfo = state.iconsData[category]?.[key];
          return `${count} on ${iconKey} [${iconInfo?.description.join(", ")}]`;
        },
      );
      lines.push(`${color} cubes: ${cubeDescriptions.join(", ")}`);
    }
  });

  return lines.join("\n");
}

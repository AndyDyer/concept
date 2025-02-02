import React, { createContext, useContext, useReducer } from "react";
import { Player, Card } from "../types/index.ts";
import { conceptDeck } from "../deck.ts";

interface GameState {
  started: boolean;
  players: Player[];
  currentExplainer: Player | null;
  roundNumber: number;
  currentWord: string;
  deck: Card[];
  isRoundEnding: boolean;
}

type GameAction =
  | {
      type: "START_GAME";
      payload: { players: Player[]; currentExplainer: Player };
    }
  | { type: "END_GAME" }
  | { type: "UPDATE_SCORES"; payload: { guesserId: number } }
  | { type: "START_ROUND_END" }
  | { type: "COMPLETE_ROUND_END" };

const initialGameState: GameState = {
  started: false,
  players: [],
  currentExplainer: null,
  roundNumber: 0,
  currentWord: "",
  deck: [...conceptDeck].sort(() => Math.random() - 0.5),
  isRoundEnding: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_GAME": {
      const shuffledDeck = [...conceptDeck].sort(() => Math.random() - 0.5);
      return {
        ...state,
        started: true,
        players: action.payload.players,
        currentExplainer: action.payload.currentExplainer,
        roundNumber: 1,
        deck: shuffledDeck,
        currentWord: shuffledDeck[0].cardValue,
        isRoundEnding: false,
      };
    }

    case "END_GAME":
      return { ...state, started: false, isRoundEnding: false };

    case "START_ROUND_END":
      return { ...state, isRoundEnding: true };

    case "COMPLETE_ROUND_END": {
      // Get next explainer
      const currentIndex = state.players.findIndex(
        (p) => p.id === state.currentExplainer?.id
      );
      const nextIndex = (currentIndex + 1) % state.players.length;
      const nextExplainer = state.players[nextIndex];

      // Get next word
      const updatedDeck = [...state.deck.slice(1)];
      const nextWord =
        updatedDeck.length > 0 ? updatedDeck[0].cardValue : "Game Over";

      return {
        ...state,
        currentExplainer: nextExplainer,
        deck: updatedDeck,
        currentWord: nextWord,
        roundNumber: state.roundNumber + 1,
        isRoundEnding: false,
      };
    }

    case "UPDATE_SCORES": {
      const { guesserId } = action.payload;
      const updatedPlayers = state.players.map((p) => {
        if (p.id === guesserId) {
          return { ...p, score: p.score + 2 }; // Guesser gets 2 points
        }
        if (p.id === state.currentExplainer!.id) {
          return { ...p, score: p.score + 1 }; // Explainer gets 1 point
        }
        return p;
      });

      return { ...state, players: updatedPlayers };
    }

    default:
      return state;
  }
};

interface GameContextType {
  state: GameState;
  startGame: (players: Player[], currentExplainer: Player) => void;
  endGame: () => void;
  updateScores: (guesserId: number) => void;
  startRoundEnd: () => void;
  completeRoundEnd: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const value: GameContextType = {
    state,
    startGame: (players, currentExplainer) =>
      dispatch({ type: "START_GAME", payload: { players, currentExplainer } }),
    endGame: () => dispatch({ type: "END_GAME" }),
    updateScores: (guesserId) =>
      dispatch({ type: "UPDATE_SCORES", payload: { guesserId } }),
    startRoundEnd: () => dispatch({ type: "START_ROUND_END" }),
    completeRoundEnd: () => dispatch({ type: "COMPLETE_ROUND_END" }),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
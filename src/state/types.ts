import { GameState, Player } from "../types/index.ts";

// Action types for different user roles
export type CommonAction =
  | {
      type: "START_GAME";
      payload: { players: Player[]; currentExplainer: Player };
    }
  | { type: "TOGGLE_DESCRIPTIONS" }
  | { type: "END_GAME" }
  | { type: "UPDATE_STATE"; payload: GameState }; // Add this action type

export type ExplainerAction =
  | { type: "PLACE_MAIN_CONCEPT"; payload: { iconKey: string } }
  | {
      type: "PLACE_SUB_CONCEPT";
      payload: { iconKey: string; color: string; isMarker?: boolean };
    }
  | { type: "REMOVE_PIECE"; payload: { iconKey: string } }
  | { type: "CLEAR_BOARD" };

export type GuesserAction = {
  type: "MAKE_GUESS";
  payload: { text: string; playerId: number };
};

// Combined action type
export type GameAction = CommonAction | ExplainerAction | GuesserAction;

// Role-based action validators
export const isExplainerAction = (
  action: GameAction,
  state: GameState,
  playerId: number,
): boolean => {
  if (!state.currentExplainer || state.currentExplainer.id !== playerId) {
    return false;
  }

  return (
    action.type === "PLACE_MAIN_CONCEPT" ||
    action.type === "PLACE_SUB_CONCEPT" ||
    action.type === "REMOVE_PIECE" ||
    action.type === "CLEAR_BOARD"
  );
};

export const isGuesserAction = (
  action: GameAction,
  state: GameState,
  playerId: number,
): boolean => {
  if (!state.currentExplainer || state.currentExplainer.id === playerId) {
    return false;
  }

  return action.type === "MAKE_GUESS";
};

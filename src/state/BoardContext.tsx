import React, { createContext, useContext, useReducer } from 'react';
import { IconsData, SubConcept } from '../types/index.ts';
import iconsData from '../icons.tsx';

interface BoardState {
  mainConcept: string | null;
  subConcepts: SubConcept[];
  showDescriptions: boolean;
  iconsData: IconsData;
}

type BoardAction = 
  | { type: 'PLACE_MAIN_CONCEPT'; payload: { iconKey: string } }
  | { type: 'PLACE_SUB_CONCEPT'; payload: { iconKey: string; color: string; isMarker?: boolean } }
  | { type: 'REMOVE_PIECE'; payload: { iconKey: string } }
  | { type: 'CLEAR_BOARD' }
  | { type: 'TOGGLE_DESCRIPTIONS' };

const initialBoardState: BoardState = {
  mainConcept: null,
  subConcepts: [],
  showDescriptions: false,
  iconsData
};

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case 'PLACE_MAIN_CONCEPT': {
      const { iconKey } = action.payload;
      if (state.mainConcept) return state;
      return { ...state, mainConcept: iconKey };
    }

    case 'PLACE_SUB_CONCEPT': {
      const { iconKey, color, isMarker } = action.payload;
      
      if (isMarker) {
        const hasMarkerOfColor = state.subConcepts.some(
          concept => concept.color === color && concept.isMarker
        );
        if (hasMarkerOfColor) return state;
      } else {
        const cubesOfColor = state.subConcepts.filter(
          concept => concept.color === color && !concept.isMarker
        ).length;
        if (cubesOfColor >= 8) return state;
      }

      return {
        ...state,
        subConcepts: [...state.subConcepts, { iconKey, color, isMarker }]
      };
    }

    case 'REMOVE_PIECE': {
      const { iconKey } = action.payload;
      if (state.mainConcept === iconKey) {
        return { ...state, mainConcept: null };
      }

      const newSubConcepts = state.subConcepts.filter((_, index) => 
        index !== state.subConcepts.length - 1
      );

      return { ...state, subConcepts: newSubConcepts };
    }

    case 'CLEAR_BOARD':
      return { ...state, mainConcept: null, subConcepts: [] };

    case 'TOGGLE_DESCRIPTIONS':
      return { ...state, showDescriptions: !state.showDescriptions };

    default:
      return state;
  }
};

interface BoardContextType {
  state: BoardState;
  placeMainConcept: (iconKey: string) => void;
  placeSubConcept: (iconKey: string, color: string, isMarker?: boolean) => void;
  removePiece: (iconKey: string) => void;
  clearBoard: () => void;
  toggleDescriptions: () => void;
}

const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  const value: BoardContextType = {
    state,
    placeMainConcept: (iconKey) => 
      dispatch({ type: 'PLACE_MAIN_CONCEPT', payload: { iconKey } }),
    placeSubConcept: (iconKey, color, isMarker = false) => 
      dispatch({ type: 'PLACE_SUB_CONCEPT', payload: { iconKey, color, isMarker } }),
    removePiece: (iconKey) =>
      dispatch({ type: 'REMOVE_PIECE', payload: { iconKey } }),
    clearBoard: () => 
      dispatch({ type: 'CLEAR_BOARD' }),
    toggleDescriptions: () => 
      dispatch({ type: 'TOGGLE_DESCRIPTIONS' })
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
export interface Player {
  id: number;
  name: string;
  score: number;
  isAI?: boolean;
  aiModel?: string;
  apiKey?: string;
}

export interface Message {
  id: number;
  playerId: number;
  playerName: string;
  text: string;
  timestamp: number;
  isCorrect?: boolean;
  isAction?: boolean;
  guesses?: string[];
  iconKey?: string;
  color?: string;
  icon?: React.ReactNode;
  isAI?: boolean;
}

export interface Card {
  cardValue: string;
  hardness: number;
}

export interface IconInfo {
  description: string[];
  icon: React.ReactNode;
  backgroundColor: string
}

export interface IconCategory {
  [key: string]: IconInfo;
}

export interface IconsData {
  [category: string]: IconCategory;
}

export interface SubConcept {
  iconKey: string;
  color: string;
  isMarker?: boolean;
}

export interface GameState {
  started: boolean;
  players: Player[];
  currentExplainer: Player | null;
  roundNumber: number;
  mainConcept: string | null;
  subConcepts: SubConcept[];
  messages: Message[];
  currentWord: string;
  deck: Card[];
  showDescriptions: boolean;
  iconsData: IconsData;
  isRoundEnding: boolean;
  currentAIPlayer?: Player;
}
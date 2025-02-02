import React, { useEffect, useRef } from "react";
import { useGame } from "./GameContext.tsx";
import { useBoard } from "./BoardContext.tsx";
import { useChat } from "./ChatContext.tsx";
import { AIPlayerManager } from "./AIPlayerManager.ts";

const AIGameManagerComponent: React.FC = () => {
  const { 
    state: gameState, 
    startRoundEnd, 
    updateScores, 
    completeRoundEnd 
  } = useGame();
  const {
    state: boardState,
    placeMainConcept,
    placeSubConcept,
    clearBoard,
  } = useBoard();
  const { state: chatState, addMessage, clearMessages } = useChat();
  
  // Create a ref to store managers for each AI player
  const managersRef = useRef<Map<number, AIPlayerManager>>(new Map());

  // Handle correct guess from AI
  const handleCorrectGuess = (playerId: number) => {
    startRoundEnd();
    updateScores(playerId);
    
    setTimeout(() => {
      clearBoard();
      clearMessages();
      completeRoundEnd();
    }, 2000);
  };

  // Initialize or update AI managers for each AI player
  useEffect(() => {
    const aiPlayers = gameState.players.filter(p => p.isAI);
    
    // Create managers for new AI players
    aiPlayers.forEach(player => {
      if (!managersRef.current.has(player.id)) {
        const manager = new AIPlayerManager(
          player,
          placeMainConcept,
          placeSubConcept,
          clearBoard,
          addMessage,
          handleCorrectGuess
        );
        managersRef.current.set(player.id, manager);
      }
    });

    // Clean up managers for removed AI players
    managersRef.current.forEach((_, playerId) => {
      if (!aiPlayers.find(p => p.id === playerId)) {
        managersRef.current.delete(playerId);
      }
    });
  }, [gameState.players]);

  // Handle state updates for each AI player
  useEffect(() => {
    if (!gameState.started) return;

    managersRef.current.forEach((manager) => {
      manager.handleGameStateUpdate(gameState, boardState, chatState);
    });
  }, [
    gameState.started,
    gameState.currentExplainer?.id,
    gameState.currentWord,
    boardState.mainConcept,
    boardState.subConcepts.length,
    chatState.messages.length,
  ]);

  return null; // This is a logic-only component
};

export default AIGameManagerComponent;
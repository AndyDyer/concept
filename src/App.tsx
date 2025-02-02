import React from "react";
import GameSetup from "./components/GameSetup/GameSetup.tsx";
import GameBoard from "./components/GameBoard.tsx";
import Chat from "./components/Chat/Chat.tsx";
import AIInterface from "./components/AIInterface/AIInterface.tsx";
import AIGameManager from "./state/AIGameManager.tsx";
import { GameProvider, useGame } from "./state/GameContext.tsx";
import { BoardProvider, useBoard } from "./state/BoardContext.tsx";
import { ChatProvider, useChat } from "./state/ChatContext.tsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/ui/tabs.tsx";

const GameContent = () => {
  const { state: gameState, startGame, updateScores, startRoundEnd, completeRoundEnd } = useGame();
  const {
    state: boardState,
    placeMainConcept,
    placeSubConcept,
    removePiece,
    clearBoard,
    toggleDescriptions,
  } = useBoard();
  const { state: chatState, addMessage, clearMessages } = useChat();

  const currentPlayer = gameState.players[0];

  const handleGuess = async (text: string, playerId: number) => {
    const player = gameState.players.find((p) => p.id === playerId);
    if (!player || gameState.isRoundEnding) return;

    const isCorrect = text.toLowerCase() === gameState.currentWord.toLowerCase();
    const isAI = player.isAI;

    // Add message
    addMessage({
      id: Date.now(),
      playerId,
      playerName: player.name,
      text,
      timestamp: Date.now(),
      isCorrect,
      isAI,
    });

    // If correct guess, update game state and end round
    if (isCorrect) {
      // Start round end process
      startRoundEnd();
      
      // Update scores
      updateScores(playerId);

      // Clear board and messages after a brief delay
      setTimeout(() => {
        clearBoard();
        clearMessages();
        // Complete round end process
        completeRoundEnd();
      }, 2000);
    }
  };

  if (!gameState.started) {
    return (
      <GameSetup
        onStartGame={startGame}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Add AIGameManager component */}
      <AIGameManager />

      {/* Fixed Top Bar - explicit height */}
      <div className="top-bar h-20 shrink-0 p-4 z-10">
        <div className="flex items-center justify-between">
          {/* Current Explainer & Word */}
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-full">
              <span className="font-bold">
                {gameState.currentExplainer?.name} is explaining!
              </span>
            </div>
            {gameState.currentExplainer?.id === currentPlayer.id && (
              <div className="bg-white px-4 py-2 rounded-full">
                <span className="text-pink-500 font-bold">
                  Word: {gameState.currentWord}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Description Toggle */}
            <button
              onClick={toggleDescriptions}
              className="bg-white px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              {boardState.showDescriptions ? "Hide" : "Show"} Descriptions
            </button>

            {/* Scores */}
            {gameState.players.map((player) => (
              <div key={player.id} className="player-score">
                <span className="font-bold">{player.name}</span>
                <span className="ml-2 text-pink-500">{player.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Fills remaining height */}
      <div className="flex gap-4 p-4 h-[calc(100vh-5rem)] overflow-hidden pb-32">
        {/* Game Board - 65% width with scroll */}
        <div className="w-[65%] game-board">
          <div className="h-full overflow-y-auto p-4">
            <div className="max-w-5xl mx-auto">
              <GameBoard
                iconsData={boardState.iconsData}
                onPlaceMainConcept={placeMainConcept}
                onPlaceSubConcept={placeSubConcept}
                onIconRightClick={removePiece}
                showDescriptions={boardState.showDescriptions}
                getIconPieces={(iconKey) => {
                  const pieces = [];
                  if (boardState.mainConcept === iconKey) {
                    pieces.push({ color: "green", isMarker: true });
                  }
                  boardState.subConcepts.forEach((concept) => {
                    if (concept.iconKey === iconKey) {
                      pieces.push({
                        color: concept.color,
                        isMarker: concept.isMarker || false,
                      });
                    }
                  });
                  return pieces;
                }}
                isExplainer={
                  gameState.currentExplainer?.id === currentPlayer.id
                }
              />
            </div>
          </div>
        </div>

        {/* Right Panel - 35% width */}
        <div className="w-[35%]">
          <Tabs defaultValue="chat" className="h-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="ai">AI Interface</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-2 h-[calc(100%-3rem)]">
              <div className="h-full chat-container">
                <Chat
                  messages={chatState.messages}
                  currentPlayer={currentPlayer}
                  onSendMessage={(text) => handleGuess(text, currentPlayer.id)}
                  disabled={gameState.currentExplainer?.id === currentPlayer.id || gameState.isRoundEnding}
                />
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-2 h-[calc(100%-3rem)]">
              <div className="h-full">
                <AIInterface />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <BoardProvider>
        <ChatProvider>
          <GameContent />
        </ChatProvider>
      </BoardProvider>
    </GameProvider>
  );
}

export default App;
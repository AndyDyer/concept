import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs.tsx';
import SystemPrompts from './SystemPrompts.tsx';
import AIActions from './AIActions.tsx';
import { useGame } from '../../state/GameContext.tsx';
import { useBoard } from '../../state/BoardContext.tsx';
import { useChat } from '../../state/ChatContext.tsx';

const AIInterface: React.FC = () => {
  const { state: gameState } = useGame();
  const { state: boardState } = useBoard();
  const { state: chatState } = useChat();

  // Only show AI interface if there's an AI player
  const aiPlayer = gameState.players.find(p => p.isAI);
  if (!aiPlayer) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Tabs defaultValue="actions">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompts">
          <SystemPrompts />
        </TabsContent>
        
        <TabsContent value="actions">
          <AIActions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInterface;
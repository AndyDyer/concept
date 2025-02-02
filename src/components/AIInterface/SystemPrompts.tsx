import React from 'react';
import { ScrollArea } from '../ui/scroll-area.tsx';
import { generateExplainerPrompt, generateGuesserPrompt } from '../../prompts/promptUtils.ts';

const SystemPrompts: React.FC = () => {
  const explainerPrompt = generateExplainerPrompt();
  const guesserPrompt = generateGuesserPrompt();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Explainer System Prompt</h3>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <pre className="text-sm whitespace-pre-wrap">
            {explainerPrompt}
          </pre>
        </ScrollArea>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Guesser System Prompt</h3>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <pre className="text-sm whitespace-pre-wrap">
            {guesserPrompt}
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SystemPrompts;
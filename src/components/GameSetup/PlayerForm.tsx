import React from 'react';
import { Switch } from '@radix-ui/react-switch';
import { Select } from '@radix-ui/react-select';
import { AI_MODELS } from '../../lib/ai.ts';

interface PlayerFormProps {
  name: string;
  isAI: boolean;
  aiModel: string;
  onNameChange: (name: string) => void;
  onIsAIChange: (isAI: boolean) => void;
  onAIModelChange: (model: string) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  name,
  isAI,
  aiModel,
  onNameChange,
  onIsAIChange,
  onAIModelChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Player name"
          className="flex-1 px-3 py-2 border rounded"
          disabled={isAI}
        />
        
        <div className="flex items-center gap-2">
          <label htmlFor="ai-toggle" className="text-sm">AI Player</label>
          <Switch
            id="ai-toggle"
            checked={isAI}
            onCheckedChange={onIsAIChange}
            className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors duration-200 ease-in-out data-[state=checked]:bg-blue-500"
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-200 ease-in-out ${
                isAI ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </Switch>
        </div>
      </div>

      {isAI && (
        <Select
          value={aiModel}
          onValueChange={onAIModelChange}
          className="w-full"
        >
          <Select.Trigger className="w-full px-3 py-2 border rounded">
            <Select.Value placeholder="Select AI Model" />
          </Select.Trigger>

          <Select.Content>
            <Select.Viewport>
              {Object.entries(AI_MODELS).map(([key, value]) => (
                <Select.Item key={key} value={value}>
                  <Select.ItemText>{key}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select>
      )}
    </div>
  );
};

export default PlayerForm;
import React, { useState, useRef, useEffect } from "react";
import { Message, Player } from "../../types/index.ts";

interface ChatProps {
  messages: Message[];
  currentPlayer: Player;
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  currentPlayer,
  onSendMessage,
  disabled = false
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  // Filter out action messages and only show guesses
  const guessMessages = messages.filter(msg => !msg.isAction);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area with scroll */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {guessMessages.map((message) => {
            // Render AI completion message
            if (message.text.startsWith('[AI')) {
              return (
                <div
                  key={`message-${message.id}`}
                  className="bg-purple-50 p-4 rounded-lg"
                >
                  <div className="font-bold text-sm text-purple-700 mb-2">
                    {message.text.split('\n')[0]}
                  </div>
                  <pre className="text-sm whitespace-pre-wrap font-mono text-purple-900">
                    {message.text.split('\n').slice(1).join('\n')}
                  </pre>
                </div>
              );
            }

            // Render player message
            return (
              <div
                key={`message-${message.id}`}
                className={`p-4 rounded-lg ${
                  message.playerId === currentPlayer.id
                    ? 'bg-blue-100 ml-auto'
                    : 'bg-gray-100'
                } ${message.isCorrect ? 'bg-green-200 border-2 border-green-400' : ''}`}
              >
                <div className="font-bold text-sm">{message.playerName}</div>
                <div className="text-lg">{message.text}</div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input form at bottom */}
      <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            placeholder={
              disabled ? "You are the explainer!" : "Type your guess here..."
            }
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Guess!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
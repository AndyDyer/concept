import React, { createContext, useContext, useReducer } from 'react';
import { Message } from '../types/index.ts';

interface ChatState {
  messages: Message[];
}

type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'CLEAR_MESSAGES' };

const initialChatState: ChatState = {
  messages: []
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      };

    default:
      return state;
  }
};

interface ChatContextType {
  state: ChatState;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const value: ChatContextType = {
    state,
    addMessage: (message) => 
      dispatch({ type: 'ADD_MESSAGE', payload: message }),
    clearMessages: () => 
      dispatch({ type: 'CLEAR_MESSAGES' })
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
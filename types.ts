
export interface CodeFile {
  name: string;
  language: string;
  content: string;
  icon: string;
}

export enum Tab {
  OVERVIEW = 'overview',
  BACKEND = 'backend',
  BOT = 'bot',
  DATABASE = 'database',
  SIMULATION = 'simulation',
  README = 'readme'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

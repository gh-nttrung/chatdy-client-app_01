export interface ChatModel {
  _id?: string;
  title?: string;
  participants?: string[];
  last_message?: string;
  created_user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessageModel{
  _id?: string;
  chat_id?: string;
  sender_id?: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ChatModel {
  _id?: string;
  title?: string;
  participants?: string[];
  last_message?: string;
  created_user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessageAI{
  role: "user" | "assistant";
  content: string;
}
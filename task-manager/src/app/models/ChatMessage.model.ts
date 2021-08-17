export interface ChatMessage {
  senderId?: string;
  message?: string;
  receiverId?: string;
  timestamp?: Date;
  chatId?: string;
}

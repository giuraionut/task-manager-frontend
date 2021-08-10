export interface Notification {
  id?: string;
  type?: string;
  sender?: string;
  content?: string;
  receiverId?: string;
  timestamp?: Date;
}

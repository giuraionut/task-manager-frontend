export interface Notification {
  id?: string;
  type?: string;
  senderId?: string;
  content?: string;
  receiverId?: string;
  timestamp?: Date;
  teamId?: string;

  //frontend
  senderAvatar?: string;
}

export interface Notification {
  type?: string;
  sender?: string;
  content?: string;
  receiver?: string;
  timestamp?: Date;
  stateRead?: Boolean;
}

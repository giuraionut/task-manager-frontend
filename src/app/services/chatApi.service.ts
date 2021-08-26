import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../models/APIResponse.model';
import { ChatMessage } from '../models/ChatMessage.model';

//api------------------------------------------------------------------------------
@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/chat/api';

  public saveChat(chat: ChatMessage): Observable<ChatMessage> {
    return this.http
      .post<APIResponse>(`${this.url}`, chat, { withCredentials: true })
      .pipe(
        map((result: APIResponse) => {
          let savedChat: ChatMessage = result.payload;
          return savedChat;
        })
      );
  }
  public getChat(partnerId: string): Observable<Array<ChatMessage>> {
    return this.http
      .get<APIResponse>(`${this.url}/${partnerId}`, { withCredentials: true })
      .pipe(
        map((result: APIResponse) => {
          let chats: Array<ChatMessage> = result.payload;
          return chats;
        })
      );
  }
}

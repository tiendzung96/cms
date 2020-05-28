import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from 'src/app/messages/MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages.slice();
  }
  getMessage(id: string){
    for (const message of this.messages){
      if (message.id === id){
        return message;
      }
    }
    return null;
  }
  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}

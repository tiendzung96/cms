import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MOCKMESSAGES } from 'src/app/messages/MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageListChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  getMessages() {
    // return this.messages.slice();
    this.http.get<Message[]>('https://rkjcms-9056c.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) =>{
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://rkjcms-9056c.firebaseio.com/messages.json', messages, { headers: headers })
    .subscribe(
      () =>{
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
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
    if (!message){
      return;
    }
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();

    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number{
    let maxId = 0;
    this.messages.forEach(message => {
      let currentId = parseInt(message.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}

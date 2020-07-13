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

  sortAndSend(){
    this.messages.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0);
    this.messageListChangedEvent.next(this.messages.slice());
  }

  getMessages() {
    this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/messages')
    .subscribe(
      (responseData) =>{
        this.messages = responseData.messages;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/messages', messages, { headers: headers })
    .subscribe(
      () =>{
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
  }

  getMessage(id: string){
    return this.http.get<{ message: string, messages: Message }>('http://localhost:3000/messages/' + id);
  }

  addMessage(message: Message){
    if (!message) {
      return;
    }

    //make sure id of the new message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, messages: Message}>('http://localhost:3000/messages', message, { headers: headers })
    .subscribe(
      (responseData) => {
        //add new contact to contacts
        message._id = responseData.messages._id;
        message.id = responseData.messages.id;
        this.messages.push(message);
        this.sortAndSend();
      }
    )
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

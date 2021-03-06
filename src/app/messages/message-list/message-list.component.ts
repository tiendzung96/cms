import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.getMessages();
  }

  ngOnInit() {
    this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) =>{
        this.messages = messages;
      }
    )
  }

  onAddMessage(message:Message){
    this.messages.push(message);
  }

}

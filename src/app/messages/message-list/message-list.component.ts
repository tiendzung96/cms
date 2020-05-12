import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] =[
    new Message('1', 'Subject 1', 'Message Text 1', 'Douglas Phan'),
    new Message('1', 'Subject 2', 'Message Text 2', 'Douglas Phan')

  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message:Message){
    this.messages.push(message);
  }

}

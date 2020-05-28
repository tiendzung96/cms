import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent =  new EventEmitter<Message>();
  sender = 'Douglas Phan';



  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('1', subjectValue, msgTextValue, this.sender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}

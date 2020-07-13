import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent =  new EventEmitter<Message>();
  sender: Contact;



  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContact('101')
      .subscribe(
        response => {
          this.sender = response.contact;
        }
      )
  }

  onSendMessage(){
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('', '', subjectValue, msgTextValue, this.sender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}

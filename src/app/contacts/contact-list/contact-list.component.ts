import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {w
  

  contacts: Contact[] = [];
  constructor(private contactService: ContactService ) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit(): void {

  }

  onSelect(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

}

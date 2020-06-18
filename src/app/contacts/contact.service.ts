import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from 'src/app/contacts/MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;


  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  addContact(newContact: Contact){
    if (newContact === null){
      return;
    } 
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalcontact: Contact, newContact: Contact){
    if (originalcontact === null || newContact === null){
      return;
    }

    const pos = this.contacts.indexOf(originalcontact);
    if (pos < 0){
      return;
    }

    newContact.id = originalcontact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact){
    if (contact === null){
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }
    
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    }

  getContact(id: string): Contact{
    for (const contact of this.contacts){
      if (contact.id === id){
        return contact;
      }
    }
    return null;
  }
  
  getMaxId(): number{
    let maxId = 0;
    this.contacts.forEach(contact => {
      let currentId = parseInt(contact.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}

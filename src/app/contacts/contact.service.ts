import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from 'src/app/contacts/MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;


  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    // return this.contacts.slice();
    this.http.get<Contact[]>('https://rkjcms-9056c.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) =>{
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  storeContacts(){
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://rkjcms-9056c.firebaseio.com/contacts.json', contacts, { headers: headers })
    .subscribe(
      () =>{
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }

  addContact(newContact: Contact){
    if (newContact === null){
      return;
    }
    this.maxContactId = this.getMaxId();
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    console.log(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
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

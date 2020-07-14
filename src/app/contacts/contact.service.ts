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

  sortAndSend(){
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactListChangedEvent.next(this.contacts.slice());
  }


  storeContacts(){
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/contacts', contacts, { headers: headers })
    .subscribe(
      () =>{
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }

  getContact(id: string){
    return this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
  }

  getContacts() {
    // return this.contacts.slice();
    this.http.get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe(
      (responseData) =>{
        this.contacts = responseData.contacts;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  addContact(contact: Contact){
    if (!contact) {
      return;
    }

    //make sure id of the new contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, contact: Contact}>('http://localhost:3000/contacts', contact, { headers: headers })
    .subscribe(
      (responseData) => {
        //add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    )
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact){
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0){
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    newContact.id = originalContact.id;

    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact){
    if (!contact){
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0){
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

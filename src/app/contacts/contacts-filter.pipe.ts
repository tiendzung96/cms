import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {

    let filteredContacts: Contact[] = [];

    if(term && term.length > 0){
      filteredContacts = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    // for (let i=0; i < contacts.length; i++){
    //   let contact = contacts[i];
    //   if(contact.name.toLowerCase().includes(term)){
    //     filteredArray.push(contact);
    //   }
    // }

    return filteredContacts.length > 0 ? filteredContacts: contacts;
  }

}

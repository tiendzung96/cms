import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'Brother Thayne','thayneti@byui.edu', '208-496-3777', 'assets/images/thayneti.jpg',null),
    new Contact('2', 'Sister Esplin','esplinc@byui.edu', '208-496-3702', 'assets/images/esplinc.jpg',null),
    new Contact('3', 'Brother Lybbert','lybberte@byui.edu', '208-496-3702', 'assets/images/lybberte.jpg',null)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }

}

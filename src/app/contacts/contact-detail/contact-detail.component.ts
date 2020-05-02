import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact('1', 'Brother Thayne','thayneti@byui.edu', '208-496-3777', 'assets/images/thayneti.jpg',null)

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  
  contacts: Contact[] = [];
  subscription: Subscription;

  term: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute ) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) =>{
      this.contacts = contacts;
    })
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactList: Contact[]) => {
      this.contacts = contactList;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewContact(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onKeyPress(value: string){
    this.term = value;
  }

}

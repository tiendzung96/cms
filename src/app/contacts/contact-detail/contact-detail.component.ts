import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  onEditContact(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

}

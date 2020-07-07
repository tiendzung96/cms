import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[] = [];
  contact: Contact;
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;
  originalContact: Contact;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      
      (params: Params) => {

        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          this.id = (this.contactService.getMaxId() + 1).toString();
          console.log(this.id);
          return
        }

        this.originalContact = this.contactService.getContact(this.id);

        if(!this.originalContact){
          return
        }

        this.editMode =  true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.groupContacts){
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group.slice()));
        }


      }
    );
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length)
      return;
    
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const newContact = new Contact(this.id, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact)
    } else{
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  isInvalidContact(newContact: Contact){
    if (!newContact){
      return true;
    }

    if (newContact.id === this.contact.id){
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }


}

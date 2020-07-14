import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f',{static: false}) slForm: NgForm;

  constructor(private route: ActivatedRoute, private documentService: DocumentService, private router: Router) { }

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return
        }

        this.documentService.getDocument(this.id)
          .subscribe(
            response => {
              this.originalDocument = response.document;
              if(!this.originalDocument){
                return
              }

              this.editMode =  true;
              this.document = JSON.parse(JSON.stringify(this.originalDocument));
            }
          );


      }
    );
  }
  onSubmit(form: NgForm){
    const values = form.value;
    const newDocument = new Document(this.id, values.name, values.description, values.documentUrl, null);
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else{
      this.documentService.addDocument(newDocument);
    }
    console.log(values);
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}

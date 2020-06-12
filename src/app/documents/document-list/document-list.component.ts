import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  constructor(private documentService: DocumentService, private router: Router,
    private route: ActivatedRoute) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) =>{
      this.documents = documents;
    })
  }



}

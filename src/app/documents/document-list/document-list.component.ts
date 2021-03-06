import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  subscription: Subscription;

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  constructor(private documentService: DocumentService, private router: Router,
    private route: ActivatedRoute) {
    this.documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) =>{
      this.documents = documents;
    });

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentList: Document[]) => {
      this.documents = documentList;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

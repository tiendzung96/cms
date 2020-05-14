import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260 - Object Oriented Programing','THis is document 1 description', 'this is the URL 1 of the document', null),
    new Document('2', 'WDD 430 - Full Stack Web Development','THis is document 2 description', 'this is the URL 2 of the document', null),
    new Document('3', 'CIT 425 - Data Warehousing','THis is document 3 description', 'this is the URL 3 of the document', null),
    new Document('4', 'CIT 495 - Senior Practicum','THis is document 4 description', 'this is the URL 4 of the document', null)

  ];

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

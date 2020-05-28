import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from 'src/app/documents/MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document{
    for (const document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }
}
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from 'src/app/documents/MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  addDocument(newDocument: Document){
    if (newDocument === null){
      return;
    } 
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (originalDocument === null || newDocument === null){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document){
    if (document === null){
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }
    
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    }

  getMaxId(): number{
    let maxId = 0;
    this.documents.forEach(document => {
      let currentId = parseInt(document.id);
      if (currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}

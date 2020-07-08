import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from 'src/app/documents/MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    // return this.documents.slice();
    this.http.get<Document[]>('https://rkjcms-9056c.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) =>{
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  storeDocuments(){
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://rkjcms-9056c.firebaseio.com/documents.json', documents, { headers: headers })
    .subscribe(
      () =>{
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
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

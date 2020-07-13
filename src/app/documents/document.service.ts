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
  sortAndSend(){
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string){
    return this.http.get<{ message: string, document: Document }>('http://localhost:3000/documents/' + id);
  }

  // getDocuments() {
  //   // return this.documents.slice();
  //   this.http.get<Document[]>('https://rkjcms-9056c.firebaseio.com/documents.json')
  //   .subscribe(
  //     (documents: Document[]) =>{
  //       this.documents = documents;
  //       this.maxDocumentId = this.getMaxId();
  //       this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  //       this.documentListChangedEvent.next(this.documents.slice());
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }

  //   );
  // }

  getDocuments() {
    // return this.contacts.slice();
    this.http.get<{message: string, documents: Document[]}>('http://localhost:3000/documents')
    .subscribe(
      (responseData) =>{
        this.documents = responseData.documents;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }

  storeDocuments(){
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/documents', documents, { headers: headers })
    .subscribe(
      () =>{
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  // addDocument(newDocument: Document){
  //   if (newDocument === null){
  //     return;
  //   }
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   const documentsListClone = this.documents.slice();
  //   this.storeDocuments();
  // }

  addDocument(document: Document){
    if (!document) {
      return;
    }

    //make sure id of the new doc is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, document: Document}>('http://localhost:3000/documents', document, { headers: headers })
    .subscribe(
      (responseData) => {
        //add new contact to contacts
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    )
  }

  // updateDocument(originalDocument: Document, newDocument: Document){
  //   if (originalDocument === null || newDocument === null){
  //     return;
  //   }

  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0){
  //     return;
  //   }

  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   const documentsListClone = this.documents.slice();
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument){
      return;
    }

    const pos = this.documents.findIndex(c => c.id === originalDocument.id);
    if (pos < 0){
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    newDocument.id = originalDocument.id;

    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  deleteDocument(document: Document){
    if (!document){
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

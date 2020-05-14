import { Component, OnInit, Input } from '@angular/core';
import { Document } from './document.model'

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() selectedDocument: Document;
  
  constructor() { }

  ngOnInit(): void {
  } 

}

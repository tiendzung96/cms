import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;


  constructor(private documentService: DocumentService, 
              private winRefService : WindRefService, 
              private route: ActivatedRoute, 
              private router: Router) {
                this.nativeWindow = winRefService.getNativeWindow();
               }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }

  onEditDocument(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView(){
    if (this.document.url)  {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }

}

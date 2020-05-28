import { DocumentService } from './document.service';

export class Document{
    constructor(
        public id:string,
        public name:string,
        public url:string,
        public children: {id: string; name: string; url: string;}[]
    ){

    }

}
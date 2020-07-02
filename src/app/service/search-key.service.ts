import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchKeyService {
  // searchKey: BehaviorSubject<string>;
  // books: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  searchKey = new BehaviorSubject([]);
  updatedSearchKey = this.searchKey.asObservable();

  constructor(private httpService: HttpService) {
    
  }
  searchBook(key: string){
    var url = '/book-store/search/' + key;
    if(key == undefined || key == "" || key.length == 0){
      url = '/book-store/home?page=0&size=12';
      key = "";
    console.log("Key", key);
    
    }
    this.httpService.getRequest(url).subscribe(data =>{
      console.log(data);
      if(key == undefined || key == "" || key.length == 0){
        this.searchKey.next(data.content);
      }else{
     // this.bookArray = data;
     this.searchKey.next(data);
      }
  });
}
}

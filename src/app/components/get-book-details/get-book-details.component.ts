import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { SearchKeyService } from 'src/app/service/search-key.service';

@Component({
  selector: 'app-get-book-details',
  templateUrl: './get-book-details.component.html',
  styleUrls: ['./get-book-details.component.scss']
})
export class GetBookDetailsComponent implements OnInit{
  bookArray = [];
  image: string;
 // pageNumber = 0;
  page ;
  // pages = [];
  pages: Array<number>;
  totalPages;
  previous;
  next;
 

  constructor(private httpservice: HttpService, public searchkeyService: SearchKeyService) { }

  ngOnInit(): void {
    this.getBooks(0);
    this.searchBook();
  }
  pageSelect(i, event){
    //console.log("I>>>", i);
    this.page = i;
   // this.previous = --i;

    // this.next = ++i;
    event.preventDefault();
    console.log('you are in next page', event.srcElement.innerHTML );
    this.getBooks(event.srcElement.innerHTML);

  }
 
  
  public getBooks(pageNumber){
    this.httpservice.getRequest('/book-store/home' + '?page=' + (pageNumber - 1) + '&size=12'
    ).subscribe(data => {
      console.log(data);
    this.bookArray = data['content'];
    this.pages  = new Array(data['totalPages']);
   // this.totalPages = data.totalElements
      });
    }
  //   next() {
  //     console.log(this.page);
  //     ++this.page;
  //  }

  //  previous() {
  //    console.log(this.page);
  //      --this.page;
  //  }

  sort(order){
    switch (order.target.value) {
        case 'Low' : {
            this.httpservice.getRequest('/book-store/sort/price-ascending').subscribe(data => {
             this.bookArray = data.content;
             console.log(this.bookArray);
             });
            break;
        }
        case 'High': {
          this.httpservice.getRequest('/book-store/sort/price-descending').subscribe(data => {
            this.bookArray = data.content;
            console.log(this.bookArray);
           });
          break;
        }
        case 'NewArrival': {
          this.httpservice.getRequest('/book-store/sort/newest-arrival').subscribe(data => {
            this.bookArray = data.content;
            console.log(this.bookArray);
           });
          break;
        }
      }
  }
  searchBook(){
    // console.log("Updated search key ", this.searchkeyService.updatedSearchKey);
    this.searchkeyService.updatedSearchKey.subscribe(listOfBook => {
      console.log("After subscription of service", listOfBook);
      if(listOfBook.length != 0){
      this.bookArray = listOfBook;
      }
      
    })
  }

}

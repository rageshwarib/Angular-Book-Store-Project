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
  page;
  pages: Array<number>;
  totalPages;
  active: boolean;
  current;
  loading = true;
 
  constructor(private httpservice: HttpService, public searchkeyService: SearchKeyService) { }

  
  ngOnInit(): void {
    this.getBooks(0);
    this.searchBook();
  }

  pageSelect(i) {
    this.page = i;
    event.preventDefault();
    this.current = i;
    this.getBooks(this.page);
}
  previousPage() {
    this.page = --this.current;
    this.getBooks(this.page);
  }

  nextPage() {
    this.page = ++this.current;
    this.getBooks(this.page);
  }

  public getBooks(pageNumber) {
    this.loading = true;
    this.httpservice.getRequest('/book-store/home' + '?page=' + (pageNumber) + '&size=12'
    ).subscribe(data => {
      this.bookArray = data.content;
      this.totalPages = data.totalPages;
      this.pages = new Array(data.totalPages);
      this.loading = false;
    });
  }

  sort(order) {
    switch (order.target.value) {
      case 'Low': {
        this.httpservice.getRequest('/book-store/sort/price-ascending').subscribe(data => {
          this.bookArray = data.content;
        });
        break;
      }
      case 'High': {
        this.httpservice.getRequest('/book-store/sort/price-descending').subscribe(data => {
          this.bookArray = data.content;
        });
        break;
      }
      case 'NewArrival': {
        this.httpservice.getRequest('/book-store/sort/newest-arrival').subscribe(data => {
          this.bookArray = data.content;
        });
        break;
      }
    }
  }
  searchBook(){
    // console.log("Updated search key ", this.searchkeyService.updatedSearchKey);
    this.searchkeyService.updatedSearchKey.subscribe(listOfBook => {
      console.log("After subscription of service", listOfBook);
      if (listOfBook.length != 0){
      this.bookArray = listOfBook;
      }
    });
  }

}

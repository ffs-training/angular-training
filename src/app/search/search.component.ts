import { Component, OnInit } from '@angular/core';
import { Book, BookService } from './book.service';

interface SearchForm {
  query: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {

  books: Array<Book>;
  formData: SearchForm;

  constructor(private bookService: BookService) {
    this.books = this.bookService.init();
    this.formData = { query: '' };
  }

  ngOnInit(): void {
  }

  submit(query: string): void {
    this.bookService.fetch(query).subscribe((books: Array<Book>): void => {
      // コールバック内でthis問題を気にせず使うためにも、アロー関数です。
      this.books = books;
    });
  }

}

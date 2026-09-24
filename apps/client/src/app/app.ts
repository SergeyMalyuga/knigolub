import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './core/services/book.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private bookService = inject(BookService);

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => console.log(books));
  }
}

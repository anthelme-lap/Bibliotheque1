import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BookFormComponent } from './book-form/book-form.component';
import { IBook } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  booklist!: IBook[];
  
  constructor(
    private bookService: BookService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getBooks()
  }

  getBooks(): void{
    this.bookService.getAllBook()
    .subscribe({
      next: book => {
        this.booklist = book
        console.log(book)
      }
    })
  }

  openDialogAddBook(){
    this.dialog.open(BookFormComponent,{
      width: '40%'
    }).afterClosed().subscribe(() =>{
      this.getBooks()
    })
  }

  openDialogEditBook(book: IBook){
    this.dialog.open(BookFormComponent,{
      width: '40%',
      data: book
    }).afterClosed().subscribe(() =>{
      this.getBooks()
    })
  }

  deleteBook(id: number){
    if(confirm("Voulez-vous vraiment le supprimer?")){
      this.bookService.deveteBook(id)
      .subscribe({
        next: () => this.getBooks()
      })
    }
  }

}

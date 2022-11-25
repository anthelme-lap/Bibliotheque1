import { ICategory } from './../../category/category';
import { IAuthor } from './../../author/author';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './../book.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { IBook } from '../book';
import { AuthorService } from '../../author/author.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  actionBtn: string='Valider';
  formTitle: string = 'Ajout de livre';
  authorlist!: IAuthor[];
  categorylist!: ICategory[];

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public editBook: IBook,
    private dialogRef: MatDialogRef<BookFormComponent>,
    private dialog: MatDialog) { }

  ngOnInit(): void {

      this.getAuthors();
      this.getCategory();
      this.bookForm = this.fb.group({
      bookTitle: ['', Validators.required],
      bookContent: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookCategory: ['', Validators.required]
    })

    if(this.editBook){
      this.actionBtn = 'Modifier';
      this.formTitle = 'Modifier livre';
      this.bookForm.controls['bookTitle'].setValue(this.editBook.bookTitle),
      this.bookForm.controls['bookContent'].setValue(this.editBook.bookContent),
      this.bookForm.controls['bookAuthor'].setValue(this.editBook.bookAuthor),
      this.bookForm.controls['bookCategory'].setValue(this.editBook.bookCategory)
    }

  }

  addBook(){
    if(!this.editBook){
      if(this.bookForm.valid){
        this.bookService.createBook(this.bookForm.value)
        .subscribe({
          next: (book) =>{
            console.log(book),
            this.bookForm.reset(),
            this.dialogRef.close('Valider')
          },
          error: () => {console.log("Une erreur s'est produite")}
        })
      }
    }else{
      this.updatedBook()
    }
  }


  updatedBook(){
    this.bookService.updatedBook(this.bookForm.value, this.editBook.id)
    .subscribe({
      next: (book) => {
        console.log(book),
        this.bookForm.reset(),
        this.dialogRef.close()
      }
    })
  }

  getAuthors(){
    this.authorService.getAuthorsList()
    .subscribe({
      next: author => {
        this.authorlist = author
        console.log(author)
      }
    })
  }

  getCategory(){
    this.categoryService.getListCategory()
    .subscribe({
      next: category => {
        this.categorylist = category
        console.log(category)
      }
    })
  }


}

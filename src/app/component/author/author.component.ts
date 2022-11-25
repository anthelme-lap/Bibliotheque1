import { AuthorService } from './author.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthor } from './author';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: any;
  authorForm!: FormGroup;
  
  constructor(
    private authorService: AuthorService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthorComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.authorForm = this.fb.group({
      authorName: ['', Validators.required]
    })
  }

  addAuthor(){
    if(this.authorForm.valid){
      this.authorService.createAuthor(this.authorForm.value)
      .subscribe({
        next: (author) => {
          console.log(author),
          this.dialogRef.close(),
          this.authorForm.reset()
          this.router.navigate(['/authors'])
        },
        error: () =>{
          console.log("Error")
        }
      })
    }
  }

  
}

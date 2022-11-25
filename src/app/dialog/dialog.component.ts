import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  bookForm!:  FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookCategory: ['', Validators.required],
      bookDescription: ['', Validators.required],
    });
  }

  addBook(){
    console.table(this.bookForm.value);
  }
  

}

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from './../author.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from '../author';

@Component({
  selector: 'app-authorEdit',
  templateUrl: './authorEdit.component.html',
  styleUrls: ['./authorEdit.component.css']
})
export class AuthorEditComponent implements OnInit {
  authorEditForm!: FormGroup;
  author!: IAuthor;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: IAuthor,
    private dialogRef: MatDialogRef<AuthorEditComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.authorEditForm = this.fb.group({
      authorName: ['',Validators.required]
    })

    if(this.editData){
      this.authorEditForm.controls['authorName'].setValue(this.editData.authorName)
    }

  }


  editAuthor(){
    if(this.authorEditForm.valid){
      this.authorService.updatedAuthor(this.authorEditForm.value, this.editData.id)
      .subscribe({
        next: (author) => {
          console.log(author),
          this.dialogRef.close(),
          this.authorEditForm.reset()
          // this.router.navigate(['/authors'])
        },
        error: () =>{
          console.log("Error")
        }
      })
    }
  }
  
}

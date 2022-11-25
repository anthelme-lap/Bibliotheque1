import { CategoryService } from './../category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryComponent } from '../category.component';
import { ICategory } from '../category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm!: FormGroup;
  actionBtn: string = 'Valider';
  public formTitle: string = 'Ajout Catégorie';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editCategory: ICategory,
    private dialogRef: MatDialogRef<CategoryComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['',Validators.required]
    })

    if(this.editCategory){
      this.actionBtn = 'Modifier';
      this.formTitle = 'Modifier Categorie'
      this.categoryForm.controls['categoryName'].setValue(this.editCategory.categoryName)
    }
  }

  addCategory(){
    if(!this.editCategory){
      if(this.categoryForm.valid){
        this.categoryService.createCategory(this.categoryForm.value)
        .subscribe({
          next: (category) => {
            console.log(category),
            this.dialogRef.close()
          }
        })
      }
    }else{
      this.updatedCategory();
    }
  }

  updatedCategory(){
    this.categoryService.updatedCategory(this.categoryForm.value, this.editCategory.id)
    .subscribe({
      next: category => {
        console.log(category),
        this.dialogRef.close(),
        this.categoryForm.reset()
      },
      error: () => {
        console.log('Vous avez un erreur au niveau de la modification de la catégorie')
      }
    })
  }

  // deleteCategory(id: number){
  //   this.categoryService.deleteCategory(id).subscribe({
  //     next: () => this.get
  //   })
  // }
}

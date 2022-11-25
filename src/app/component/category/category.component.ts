import { CategoryService } from './category.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ICategory } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList!: ICategory[];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getCategory()
  }

  getCategory(){
    this.categoryService.getListCategory()
    .subscribe({
      next: category => this.categoryList = category
    })
  }

  openDialogAddCategory(){
    this.dialog.open(CategoryFormComponent,{
      width: '40%'
    }).afterClosed().subscribe(val => {
      this.getCategory()
    })
  }

  openDialogEditCategory(category: ICategory){
    this.dialog.open(CategoryFormComponent,{
      width: '40%',
      data: category
    }).afterClosed().subscribe(val => {
      this.getCategory()
    })
  }

  deleteCategory(id: number){
    if(confirm("ok ?")){
        this.categoryService.deleteCategory(id).subscribe({
        next:(ory) => {
          this.getCategory()
        }
      })
    }
    
  }
}

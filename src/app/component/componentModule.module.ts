import { MatButtonModule } from '@angular/material/button';
import { AuthorListComponent } from './author/authorList/authorList.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule} from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { AuthorComponent } from './author/author.component';
import { AuthorEditComponent } from './author/authorEdit/authorEdit.component';

const route: Routes = [
  {path: 'authors', component:AuthorListComponent},
  // {path: '**', redirectTo: 'home', pathMatch: 'full'}


  
]

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
    
  ],
  declarations: [
    AuthorComponent,
    AuthorEditComponent,
    AuthorListComponent,
  ]
})
export class ComponentModuleModule { }

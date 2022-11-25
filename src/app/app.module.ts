import { SignupModule } from './authenticator/signup.module';
import { BookModule } from './component/book/book.module';
import { HomeModule } from './component/home/home.module';
import { CategoryModule } from './component/category/category.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModuleModule } from './component/componentModule.module';
import { HttpClientModule } from '@angular/common/http';
import {  MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './authenticator/signup.component';





@NgModule({
  declarations: [				
    AppComponent
    
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    ComponentModuleModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryModule,
    HomeModule,
    BookModule,
    SignupModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

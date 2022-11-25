import { Router, ActivatedRoute } from '@angular/router';
import { IAuthor } from './../author';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorComponent } from '../author.component';
import { AuthorEditComponent } from '../authorEdit/authorEdit.component';

@Component({
  selector: 'app-authorList',
  templateUrl: './authorList.component.html',
  styleUrls: ['./authorList.component.css']
})
export class AuthorListComponent implements OnInit {

  authorList!: IAuthor[];
  author!: IAuthor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  //  authorId: number = +this.route.snapshot.paramMap.getAll('id')

  getAuthors(): void{
    this.authorService.getAuthorsList()
    .subscribe({ 
      next: author => this.authorList = author,
    })
  }

  openDialogAddAuthor(){
    this.dialog.open(AuthorComponent,{
      width: '40%'
    }).afterClosed().subscribe(val =>{
      // if(val === 'save'){
        this.getAuthors()
      // }
    })
  }

  openDialogEditAuthor(author: IAuthor){
    this.dialog.open(AuthorEditComponent,{
      width: '40%',
      data: author
    }).afterClosed().subscribe(val =>{
      // if(val === 'save'){
        this.getAuthors()
      // }
    })
  }

  
  public deleteAuthor(id: number): void{
    if(confirm(`Voulez-vous vraiment le supprimer? `)){
      this.authorService.deleteAuthor(id).subscribe({
        next: () => this.getAuthors()
      })
    }
  }

}

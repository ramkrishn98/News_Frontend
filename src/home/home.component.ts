import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HackerNewsService } from '../Services/hacker-news.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatList, MatListItem, MatListItemLine } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [MatFormField,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatList,
    MatListItem,
    MatListItemLine,
    MatCardModule, MatProgressSpinnerModule, MatLabel, MatIconModule]
})

export class HomeComponent implements AfterViewInit, OnInit {
  title: string | undefined;
  searchText: string = "";
  isLoader: boolean = false;
  public hackerNewsStories: HackerNewsStory[] = [];

 //displayedColumns: string[] = ['title', 'by', 'url'];

  constructor(private _hackerNewsService: HackerNewsService) {
    this.title = "Hacker News Top 200 stories";
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getNewsList();
  }

  ngAfterViewInit() {
    //this.hackerNewsStories.paginator = this.paginator;
  }

  getNewsList(searchKeyWord: string = '') {
    this.isLoader = true;
    this.hackerNewsStories = [];
    this._hackerNewsService.getNewsList(searchKeyWord).subscribe((response: HackerNewsStory[]) => {
      this.hackerNewsStories = response;
      this.isLoader = false;
    });
  }

  onSearch(event: any) {
    let searchValue = event.target.value;
    this.getNewsList(searchValue);
  }

  open(url: string) {
    window.open(url, "_blank");
  }
}

export interface HackerNewsStory {
  id: number;
  by: string;
  title: string;
  url: string;
}

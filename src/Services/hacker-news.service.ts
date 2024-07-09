import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HackerNewsStory } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  
  }

  getNewsList(searchKeyWord: string): Observable<HackerNewsStory[]> {
    const params = new HttpParams().set('searchKeyWord', searchKeyWord);
    const options = { headers: this.httpOptions.headers, params: params };
    return this.httpClient.get<HackerNewsStory[]>('https://localhost:44377/api/NewsArticle', options);
  }
}
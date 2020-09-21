import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { News, NewsResponse } from '../model/news';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  baseUrl = 'https://api.nytimes.com/svc/topstories/v2';

  constructor(
    private http: Http
  ) { }

  getUrl(sectionName: string) {
    return `${this.baseUrl}/${sectionName}.json?api-key=315a5a51483b469a918246dc2753b339`;
  }

  getSectionNews(sectionName: string): Observable<News[]> {
    // fetch news of that sectionName
    const url = this.getUrl(sectionName);
    
    return this.http.get(url)
    .map(
      resp => resp.json()
    );
  }
}

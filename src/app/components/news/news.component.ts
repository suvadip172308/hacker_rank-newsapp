import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import '../../../../node_modules/zone.js/dist/zone.js';

import { NewsItemComponent } from './news-item/news-item.component';
import { NewsService } from '../../services/news.service';
import { News, NewsResponse } from '../../model/news';
import { NewsActions } from '../../store/actions/news.actions';
import { getNews } from '../../store/reducers/selector';
import { news} from '../../store/reducers/news.reducer';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ NewsService ]
})
export class NewsComponent implements OnInit {
  sectionNewsList: any;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private store: Store<any[]>
  ) { }

  ngOnInit() {
    let sectionName = '';
      // send this sectionName to newsService. Subscribe newsService and get the newsList
      // now, get news from store
      this.route.params.subscribe( params => {
        sectionName = params['id'];
        this.newsService.getSectionNews(sectionName).subscribe((list) => {
          this.store.dispatch(new NewsActions().LoadSectionNews(list['results']));
        });
      });

      this.store.select('news').subscribe(news => {
        this.sectionNewsList = news['newsList'];
      });
  }
}

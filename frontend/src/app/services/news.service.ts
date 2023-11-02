import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  #tokenService = inject(TokenService);

  #apiURL = environment.apiURL;

  get(page = 1, limit = 30) {
    const now = new Date();
    const d = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    const url = this.#apiURL +
      '/v2/Tourism/Bus/News/TaiwanTrip' +
      `?$format=JSON` +
      `&$orderby=PublishTime desc` +
      `&$filter=date(EndTime) le ` + d +
      `&$top=${limit}` +
      `&$skip=${((page - 1)*limit)}`;

    return this.#tokenService.getHttp(url) as Observable<News[]>;
  }
}

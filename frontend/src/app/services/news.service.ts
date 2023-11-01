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
    const url = this.#apiURL +
      '/v2/Tourism/Bus/News/TaiwanTrip' +
      `?$format=JSON` +
      `&$top=${limit}` +
      `&$skip=${((page - 1)*limit)}`;

    return this.#tokenService.getHttp(url) as Observable<News[]>;
  }
}

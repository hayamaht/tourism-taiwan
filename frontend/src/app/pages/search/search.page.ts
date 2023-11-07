import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTermComponent } from 'src/app/components/search/search.component';
import { Observable, of } from 'rxjs';
import { TourismService } from 'src/app/services/tourism.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchResult } from 'src/app/models/search-result.model';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.page.html',
  imports: [
    CommonModule, RouterModule,
    SearchTermComponent,
  ],
})
export class SearchPage implements OnInit {
  #route = inject(ActivatedRoute);
  #tourismService = inject(TourismService);

  result$!: Observable<SearchResult[]>;
  term: string = '';

  ngOnInit(): void {
    this.#route.params.subscribe(params => {
      //console.log(params);
      this.term = params['search'] ? params['search'] : '';
      if (!params||!params['search']) {
        this.result$ = of([]);
        return;
      }
      this.result$ = this.#tourismService.search(
        params['search']
      );
    });
  }
}

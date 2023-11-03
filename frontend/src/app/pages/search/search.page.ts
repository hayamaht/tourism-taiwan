import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from 'src/app/components/search/search.component';
import { Observable } from 'rxjs';
import { TourismService } from 'src/app/services/tourism.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './search.page.html'
})
export class SearchPage implements OnInit {
  #tourismService = inject(TourismService);

  result$!: Observable<any>;

  ngOnInit(): void {
    this.result$ = this.#tourismService.search('蟹');
  }
}

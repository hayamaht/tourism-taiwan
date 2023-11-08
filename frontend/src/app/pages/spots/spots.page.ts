
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Favorite } from 'src/app/models/favorite.model';
import { FormsModule } from '@angular/forms';
import { Setting } from 'src/app/models/setting.model';


@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule, FormsModule,
    CardSpotComponent, CitySelectorComponent,
  ],
})
export class SpotsPage implements OnInit {
  static ROW_PER_PAGE = 20;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);
  #authService = inject(AuthService);
  #userService = inject(UserService);

  selectedCity!: string
  spots$!:  Observable<any>;
  favs!: Favorite[];
  user!: User;
  setting!: Setting;
  city!: string;
  page = 1;
  count = 0;
  totalPages = 0;
  selectedPage = 1;

  ngOnInit() {
    this.#authService.user$.subscribe(user => {
      this.user = user;
      if (!user.email) return;
      this.#userService.getSettings(user.email).subscribe(s => {
        this.setting = s;
        this.selectedCity = s.city;
      });

    });

    this.#route.paramMap.subscribe(params => {
      const city = params.get('city') || CityName.Taipei;
      const page = parseInt(params.get('page') || '1');
      const cs = Object.keys(CityName);
      const b = cs.filter((v) => v === city);

      if (b.length === 0 || isNaN(page)) {
        this.#router.navigate(['spots', 'Taipei',1]);
        return;
      }

      this.city = city;
      this.#getSpotsByCity();
      this.#tourismService
        .getCountByType(TourismCat.ScenicSpot, city as CityName)
        .subscribe(len => {
          this.count = len;
          this.totalPages = Math.ceil(len / SpotsPage.ROW_PER_PAGE);
          this.page = page;
          this.selectedPage = page;
          if (this.page <= 0 || this.page > this.totalPages) {
            this.#router.navigate(['../', 1], {
              relativeTo: this.#route
            });
          } else {
            this.gotoPage(this.page);
          }
        });
    });
  }

  onPageChange(event: any) {
    const v = parseInt(event.target.value)
    this.gotoPage(v);
  }

  getSpots(cityName: string) {
    this.#router.navigate(['spots', cityName]);
  }

  gotoPage(n: number) {
    this.page = n;
    this.#gotoPage();
  }

  prevPage() {
    this.page -= 1;
    this.#gotoPage();
  }

  nextPage() {
    this.page += 1;
    this.#gotoPage();
  }

  #gotoPage() {
    this.#location.replaceState(`spots/${this.city}/${this.page}`);
    this.selectedPage = this.page;
    this.#getSpotsByCity();
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  #getSpotsByCity() {
    this.spots$ = forkJoin([
      this.#userService.getByOwnerFavorites(this.user.email),
      this.#tourismService.getByCityName(
        TourismCat.ScenicSpot,
        this.city as CityName,
        this.page,
        SpotsPage.ROW_PER_PAGE
      )
    ]).pipe(
      tap(_ => this.#goTop()),
      map(([v1, v2]) => {
        const fv = v1 as Favorite[];
        const ss = v2 as [];
        for(let i in ss) {
          const spot = ss[i] as any;
          const id = spot.ScenicSpotID;
          for(let j in fv) {
            if (fv[j].tourismId === id) {
              spot.favorite = true;
            }
          }
        }
        return v2;
      })
    );
  }
}

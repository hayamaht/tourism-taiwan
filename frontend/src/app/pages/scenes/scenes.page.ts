import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TypeSelectorComponent } from 'src/app/components/type-selector/type-selector.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, forkJoin, map, of, tap } from 'rxjs';
import { NormalSpot, Spot } from 'src/app/models/scene.model';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { TourismCat, TourismCategoryTW } from 'src/app/models/tourism-cat.model';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Favorite } from 'src/app/models/favorite.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Setting } from 'src/app/models/setting.model';

@Component({
  selector: 'app-scenes',
  standalone: true,
  templateUrl: './scenes.page.html',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TypeSelectorComponent, CitySelectorComponent,
    PaginationComponent, CardSpotComponent
  ],
})
export class ScenesPage implements OnInit {
  #location = inject(Location);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #tourismService = inject(TourismService);
  #userService = inject(UserService);
  #authService = inject(AuthService);

  randomSpots$!: Observable<Spot[]>;
  spots$!: Observable<Spot[]>;

  form = this.#fb.group({
    type: [''],
    city: [''],
  });

  typesTW = Object.entries(TourismCategoryTW);
  citiesTW = Object.entries(CityNameTW);

  city!: string;
  type!: string;
  title!: string;
  page = 1;
  user!: User;
  setting!: Setting;
  selectedCity!: CityName;
  count = 0;
  totalPages = 0;
  //selectedPage = 1;
  // get random() {
  //   const r = Math.floor(Math.random() * 4);
  //   console.log(r)
  //   return r;
  // }

  ngOnInit(): void {
    this.#authService.user$.subscribe(user => {
      this.user = user;
      if (!user.email) return;
      this.#userService.getSettings(user.email).subscribe(s => {
        this.setting = s;
        this.selectedCity = s.city;

        // this.form.patchValue({
        //   city:this.selectedCity
        // });
      });
    });

    this.#route.queryParamMap.subscribe(params => {
      const type = params.get('type');
      const city = params.get('city');
      const page = params.get('p') || '1';

      this.form.patchValue({
        city, type
      });

      this.title = (!type && !city) ? '隨機產生' :
        (!type) ? '從類型隨機產生' :
        (!city) ? '從城市隨機產生' :
        '';

      this.randomSpots$ = (!type && !city) ? this.#tourismService.getRandom() :
        (!type) ? this.#tourismService.getRandom(undefined, city as CityName) :
        (!city) ? this.#tourismService.getRandom(type as TourismCat) :
        of([]);
      this.spots$ = (type && city)
        ? this.#tourismService.getSpots(type as TourismCat, city as CityName)
        : of([]);

      if(!type || !city) return;

      this.type = type;
      this.city = city;

      this.#tourismService
        .getCountByType(type as TourismCat, city as CityName)
        .subscribe(len => {
          this.count = len;
          this.totalPages = Math.ceil(len / 20);
          this.page = parseInt(page);
          //this.selectedPage = 1;//parseInt(page);
          if (this.page <= 0 || this.page > this.totalPages) {
            this.#router.navigate([], {
              //relativeTo: this.#route
              queryParams: { p: 1 },
              queryParamsHandling: 'merge'
            });
          } else {
            this.gotoPage(this.page);
          }
        });
    });
  }

  onTypeChange(event: any) {;
    this.#router.navigate([], {
      queryParams: {
        type: event.currentTarget.value
      },
      queryParamsHandling: 'merge'
    });
  }

  onCityChange(event: any) {
    this.#router.navigate([], {
      queryParams: {
        city: event.currentTarget.value
      },
      queryParamsHandling: 'merge'
    });
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
    //this.#location.replaceState(`spots/${this.city}/${this.page}`);
    //this.selectedPage = this.page;
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
      this.#tourismService.getSpots(
        this.type as TourismCat,
        this.city as CityName,
        this.page,
      )
    ]).pipe(
      tap(_ => this.#goTop()),
      map(([v1, v2]) => {
        const fv = v1 as Favorite[];
        const ss = v2 as Spot[];
        for(let i in ss) {
          const spot = ss[i] as NormalSpot;
          const id = spot.id;
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

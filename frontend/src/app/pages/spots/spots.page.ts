import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { map, Observable, switchMap } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';

@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule,
    CardSpotComponent, CitySelectorComponent,
  ],
})
export class SpotsPage implements OnInit {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit() {
    initTE({ Ripple });
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#getSpotsByCity();
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      this.page = p;
      this.#getSpotsByCity();
    });
  }

  getSpots(cityName: string) {
    this.#router.navigate(['spots', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(`spots/${this.city}`, `page=${this.page}`);
    this.#getSpotsByCity();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(`spots/${this.city}`, `page=${this.page}`)
    this.#getSpotsByCity();
  }

  #getSpotsByCity() {
    this.spots$ = this.#tourismService.getByCityName(
      'spot',
      this.city as CityName,
      this.page,
      SpotsPage.ROW_PER_PAGE
    ).pipe(
      map((items) => {
        const len = (items as []).length;
        this.stopCount = (len < SpotsPage.ROW_PER_PAGE) ? true : false;
        return items;
      }),
    );
  }
}

// {
//   "ScenicSpotID": "string",
//   "ScenicSpotName": "string",
//   "DescriptionDetail": "string",
//   "Description": "string",
//   "Phone": "string",
//   "Address": "string",
//   "ZipCode": "string",
//   "TravelInfo": "string",
//   "OpenTime": "string",
//   "Picture": {
//     "PictureUrl1": "string",
//     "PictureDescription1": "string",
//     "PictureUrl2": "string",
//     "PictureDescription2": "string",
//     "PictureUrl3": "string",
//     "PictureDescription3": "string"
//   },
//   "MapUrl": "string",
//   "Position": {
//     "PositionLon": 0,
//     "PositionLat": 0,
//     "GeoHash": "string"
//   },
//   "Class1": "string",
//   "Class2": "string",
//   "Class3": "string",
//   "Level": "string",
//   "WebsiteUrl": "string",
//   "ParkingInfo": "string",
//   "ParkingPosition": {
//     "PositionLon": 0,
//     "PositionLat": 0,
//     "GeoHash": "string"
//   },
//   "TicketInfo": "string",
//   "Remarks": "string",
//   "Keyword": "string",
//   "City": "string",
//   "SrcUpdateTime": "2023-10-19T13:42:46.948Z",
//   "UpdateTime": "2023-10-19T13:42:46.948Z"
// }

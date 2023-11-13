import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserFavorite } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Spot } from 'src/app/models/scene.model';

@Component({
  selector: 'app-card-spot',
  standalone: true,
  templateUrl: './card-spot.component.html',
  imports: [CommonModule, RouterModule, ],
})
export class CardSpotComponent implements OnInit {
  @Input() type!: string;
  @Input() spot!: Spot;

  #authService = inject(AuthService);
  #userService = inject(UserService);

  path!: string;
  user: User|undefined;

  ngOnInit(): void {
    this.user = this.#authService.currentUser;
  }

  fav() {
    if (!this.user)  return;

    if (!this.spot.favorite) {
      this.#userService.setFavoriteOnCat({
        email: this.user.email,
        tourismCategory: TourismCat.ScenicSpot.toString(),
        tourismId: this.spot.id
      } as UserFavorite).subscribe(_ => {
        this.spot.favorite = true;
      });
    } else {
      this.#userService.removeFavoriteOnCat({
        email: this.user.email,
        tourismCategory: TourismCat.ScenicSpot.toString(),
        tourismId: this.spot.id,
      } as UserFavorite).subscribe(_ => {
        this.spot.favorite = false;
      });
    }
  }
}

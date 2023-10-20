import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat!: number;
  @Input() lon!: number;
  @Input() name!: string;

  map!: leaflet.Map;

  ngOnInit(): void {
    console.log(`lat=${this.lat}, lon=${this.lon}`)
  }

  ngAfterViewInit(): void {
    this.#initMap();
  }

  #initMap() {
    this.map = leaflet.map('map', {
      center: [this.lat, this.lon],
      zoom: 16
    });
    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    leaflet.popup()
      .setLatLng([this.lat, this.lon])
      .setContent(this.name)
      .openOn(this.map);
  }
}

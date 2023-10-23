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
  @Input() lat?: number;
  @Input() lon?: number;
  @Input() name?: string;
  @Input() geometry?: any;

  map!: leaflet.Map;

  ngOnInit(): void {
    console.log(`lat=${this.lat}, lon=${this.lon}`)
  }

  ngAfterViewInit(): void {
    this.#initMap();
  }

  #initMap() {
    let lat:number;
    if(this.lat && this.lon) {
      this.#setMap(this.lat, this.lon);
      this.#setTiles();
      this.#setPopup();
    } else if (this.geometry) {
      this.#setMap(
        this.geometry.geometry.coordinates[0][1],
        this.geometry.geometry.coordinates[0][0]
      );
      this.#setTiles();
      this.#setGeoJson();
    }
  }

  #setMap(lat:number, lon:number) {
    this.map = leaflet.map('map', {
      center: [lat, lon],
      zoom: 16
    });
  }

  #setTiles() {
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  #setPopup() {
    if (!this.lat || !this.lon || !this.name) return;
    leaflet.popup()
      .setLatLng([this.lat, this.lon])
      .setContent(this.name)
      .openOn(this.map);
  }

  #setGeoJson() {
    leaflet.geoJSON([this.geometry]).addTo(this.map);
  }

}

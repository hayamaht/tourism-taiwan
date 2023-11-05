import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="map-container  ">
  <div class="map-frame" >
    <div id="map" class="-z-0"></div>
  </div>
</div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat?: number;
  @Input() lon?: number;
  @Input() name?: string;
  @Input() geometry?: any;

  map!: leaflet.Map;

  ngOnInit(): void {
    leaflet.Icon.Default.imagePath = 'assets/leaflet/'
    //console.log(`lat=${this.lat}, lon=${this.lon}`)
  }

  ngAfterViewInit(): void {
    this.#initMap();
  }

  #initMap() {
    if(this.lat && this.lon) {
      this.#setMap(this.lat, this.lon);
      this.#setTiles();
      this.#setMarker();
    } else if (this.geometry) {
      const type = this.geometry.geometry.type;
      const lat = (type === "MultiLineString")
        ? this.geometry.geometry.coordinates[0][0][1]
        : this.geometry.geometry.coordinates[0][1];
      const lon = (type === "MultiLineString")
        ? this.geometry.geometry.coordinates[0][0][0]
        : this.geometry.geometry.coordinates[0][0];
      this.#setMap(lat, lon);
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

  #setMarker() {
    if (!this.lat || !this.lon || !this.name) return;
    leaflet.marker([this.lat, this.lon])
      .addTo(this.map)
      .bindPopup(this.name)
      .openPopup();
  }

  #setPopup() {
    if (!this.lat || !this.lon || !this.name) return;
    return leaflet.popup()
      .setLatLng([this.lat, this.lon])
      .setContent(this.name)
      .openOn(this.map);
  }

  #setGeoJson() {
    leaflet.geoJSON([this.geometry]).addTo(this.map);
  }

}

import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;

  newPoint: [number, number];

  points: PointOfInterest[];

  constructor(private searchService: SearchService, private mapService: MapService) {
    searchService.newPointsAnnounced.subscribe(pois => {
      this.newPoint = null;
      this.points = pois;
      if (pois.length > 0) {
        this.lat = pois[0].latitude;
        this.lng = pois[0].longitude;
      };
    });
    
    mapService.cardCanceledAnnounced.subscribe(_ => {
      this.newPoint = null;
    });

  }

  markerClicked(point: PointOfInterest) {
    this.newPoint = null;
    this.mapService.announcePointSelected(point);
  }

  mapOnClick($event){
    this.mapService.announceNewPoint(this.lat, this.lng);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.newPoint = [this.lat, this.lng]
  }
}

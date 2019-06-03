import { Component } from '@angular/core';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { proj } from 'openlayers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;

  newPoint: [number, number];
  selectedMarker: PointOfInterest;
  points: PointOfInterest[];

  constructor(private searchService: SearchService, private mapService: MapService) {
    this.searchService.newPointsAnnounced.subscribe(pois => {
      this.newPoint = null;
      this.points = pois;
      if (pois.length > 0) {
        this.lat = pois[0].latitude;
        this.lng = pois[0].longitude;
      };
    });
    this.mapService.pointSelectedAnnounced.subscribe(point =>  {
      this.selectedMarker = point;
      this.lat = point.latitude;
      this.lng = point.longitude;

    });
    this.mapService.cardCanceledAnnounced.subscribe(_ => {
      this.newPoint = null;
      this.selectedMarker = null;
    });
  }

  markerClicked(point: PointOfInterest) {
    console.log(point);
    this.newPoint = null;
    this.selectedMarker = point;
    this.lat = point.latitude;
    this.lng = point.longitude;

    this.mapService.announcePointSelected(point);
  }

  newPointClicked(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;

    this.newPoint = [this.lat, this.lng]
    this.mapService.announceNewPoint(this.lat, this.lng);
  }

  mapOnClick($event){
    let clickedCoords = proj.toLonLat($event.coordinate);

    const clickedFeature = $event.map.forEachFeatureAtPixel($event.pixel,
      (feature, _ ) => { return feature }
      );

    if(clickedFeature != null) {
      let clickedPoi = this.points.sort((a, b) => {
        return (Math.abs(a.latitude - clickedCoords[1]) + Math.abs(a.longitude - clickedCoords[0]) 
        - (Math.abs(b.latitude - clickedCoords[1]) + Math.abs(b.longitude - clickedCoords[0])));
      })[0];
      this.markerClicked(clickedPoi);
    } else {
      this.newPointClicked(clickedCoords[1], clickedCoords[0])
    }

  }
}

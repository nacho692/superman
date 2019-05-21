import { Component, OnInit, Input } from '@angular/core';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  points: PointOfInterest[];
  selectedPoint: PointOfInterest;

  constructor(private searchService: SearchService, private mapService: MapService) { 
    this.searchService.newPointsAnnounced.subscribe(pois => {
      this.points = pois;
    });
    this.mapService.pointSelectedAnnounced.subscribe(point => {
      this.selectedPoint = point;
    });
    this.mapService.cardCanceledAnnounced.subscribe(_ => {
      this.selectedPoint = null;
    });
  }

  ngOnInit() {
  }

  resultSelected(point: PointOfInterest) {
    this.selectedPoint = point;
    this.mapService.announcePointSelected(point);
  }
}

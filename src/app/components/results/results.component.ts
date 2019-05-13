import { Component, OnInit, Input } from '@angular/core';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  points: PointOfInterest[];

  constructor(private searchService: SearchService) { 
    this.searchService.newPointsAnnounced.subscribe(pois => {
      this.points = pois;
    })
  }

  ngOnInit() {
  }

}

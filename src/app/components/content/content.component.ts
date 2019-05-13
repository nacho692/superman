import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/domain/category';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { PointOfInterest } from '../../domain/point-of-interest';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  constructor(private pointsOfInterestService : PointsOfInterestService) {
  }

  ngOnInit() {
  }
}

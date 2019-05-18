import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { Category } from 'src/app/domain/category';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-point-view-form',
  templateUrl: './point-view-form.component.html',
  styleUrls: ['./point-view-form.component.css']
})
export class PointViewFormComponent implements OnInit {

  shouldShow: boolean = false;
  point: PointOfInterest;

  constructor(private mapService: MapService,
              private categoryService: CategoryService) { 
      this.mapService.pointSelectedAnnounced.subscribe(point => {
        this.shouldShow = true;
        this.point = point;
      });
      this.mapService.newPointAnnounced.subscribe(_ => {
        this.shouldShow = false;
      });
      this.mapService.cardCanceledAnnounced.subscribe(_ => {
        this.shouldShow = false;
      });
      this.categoryService.newCategoryProposalAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
  }
  
  ngOnInit() {
  }

}

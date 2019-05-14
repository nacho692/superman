import { Component, OnInit } from '@angular/core';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { CategoryService } from 'src/app/services/categories.service';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';

@Component({
  selector: 'app-point-create-form',
  templateUrl: './point-create-form.component.html',
  styleUrls: ['./point-create-form.component.css']
})
export class PointCreateFormComponent implements OnInit {

  shouldShow: boolean = false;
  newPointCoords: [number, number];
  newPointQuestions: QuestionBase<any, any>[];

  constructor(private mapService: MapService, 
    private searchService: SearchService,
    private categoryService: CategoryService, 
    private pointOfInteresetService: PointsOfInterestService) {
      this.mapService.newPointAnnounced.subscribe(coords => {
        this.shouldShow = true;
        this.newPoint(coords[0], coords[1]);
      });
      this.searchService.newPointsAnnounced.subscribe(coords => {
        this.shouldShow = false;
      });

      this.mapService.cardCanceledAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
    }

  ngOnInit() {
  }

  newPoint(lat: number, lng: number) {
    this.newPointCoords = [lat, lng];
    this.categoryService.getCategories().subscribe(categories => {
      this.newPointQuestions = [
        new TextboxQuestion({
          key: "name",
          label: "Name",
          value: "",
          required: true,
          order: 1
        }),
        new TextboxQuestion({
          key: "description",
          label: "Description",
          order: 2
        }),
        new MulticheckQuestion({
          key: "categories",
          order: 3,
          options: categories.map(c => ({key: c.id, name: c.name})),
        })
      ];
    })
  }

  onSubmit(payload: any) {
    let categories = []
    Object.entries(payload.categories).forEach(
      ([key, value]) => {
        if (value) {
          categories.push(Number(key));
        }
      }
    );
    
    this.pointOfInteresetService.save(this.newPointCoords[0], this.newPointCoords[1], payload.name, payload.description, categories);
  }

}

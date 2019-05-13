import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { MapService } from 'src/app/services/map.service';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/domain/category';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  point: PointOfInterest;
  
  categories: Array<Category>;

  formNewPoint: [number, number];
  newPointQuestions: QuestionBase<any, any>[];

  constructor(private mapService: MapService, 
    private searchService: SearchService,
    private categoryService: CategoryService, 
    private pointOfInteresetService: PointsOfInterestService) { 

      this.mapService.pointSelectedAnnounced.subscribe(point => {
        this.formNewPoint = null;
        this.point = point;
      });

      this.searchService.newPointsAnnounced.subscribe(_ => {
        this.formNewPoint = null;
      });

      this.mapService.newPointAnnounced.subscribe(coords => {
        this.formNewPoint = null;
        this.newPoint(coords[0], coords[1]);
      });

      categoryService.getCategories().subscribe(cats => 
        this.categories = cats
      );
  }

  cancel() {
    this.formNewPoint = null;
    this.mapService.announceCardCanceled();
  }

  newPoint(lat: number, lng: number) {
    this.formNewPoint = [lat, lng];
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
          categories.push(this.categories.find(c => c.id == Number(key)));
        }
      }
    );
    
    this.pointOfInteresetService.save(this.formNewPoint[0], this.formNewPoint[1], payload.name, payload.description, categories);
  }

  ngOnInit() {
  }
}

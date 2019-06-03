import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { PointOfInterest } from 'src/app/domain/point-of-interest';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { CheckboxQuestion } from 'src/app/utils/question-checkbox';

@Component({
  selector: 'app-point-edit-form',
  templateUrl: './point-edit-form.component.html',
  styleUrls: ['./point-edit-form.component.css']
})

export class PointEditFormComponent implements OnInit {

  shouldShow = false;
  editedPoint: PointOfInterest;
  editPointsQuestions: QuestionBase<any, any>[];

  constructor(private mapService: MapService,
    private categoryService: CategoryService,
    private pointOfInterestService: PointsOfInterestService) {
      
      this.editPointsQuestions = [];

      this.mapService.newPointAnnounced.subscribe(coords => {
        this.shouldShow = false;
      });
      this.mapService.pointSelectedAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
      this.categoryService.showProposalsAnnounced.subscribe(_ => {
        this.shouldShow = false;
      });
      this.categoryService.newCategoryProposalAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
      this.categoryService.categoryEditionAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
      this.pointOfInterestService.pointEditedAnnouncement.subscribe( point => {
        this.editPoint(point);
        this.shouldShow = true;
      });
    }

  ngOnInit() {
  }  

  editPoint(point: PointOfInterest) {
    this.editedPoint = point;
    this.categoryService.getCategories().subscribe(categories => {
      this.editPointsQuestions = [
        new TextboxQuestion({
          key: "name",
          label: "Name",
          value: this.editedPoint.name,
          required: true,
          order: 1
        }),
        new TextboxQuestion({
          key: "description",
          label: "Description",
          value: this.editedPoint.description,
          order: 2
        }),
        new MulticheckQuestion({
          key: "categories",
          order: 3,
          options: categories.map(c => ({
            key: c.id, name: c.name, 
            value: this.editedPoint.categories.findIndex(edC => c.id === edC.id) >= 0})),
        }),
        new TextboxQuestion({
          key: "image_url",
          label: "Image",
          order: 4,
          value: this.editedPoint.image_url
        }),
        new CheckboxQuestion({
          key: "shouldHide",
          label: "Hide Point",
          value: !this.editedPoint.should_show,
          order: 5
        })
      ];
    });
  }

  close() {
    this.shouldShow = false;
    this.editedPoint = null;
    this.mapService.announceCardCanceled();
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
    this.pointOfInterestService.edit(this.editedPoint.id, 
      payload.name, 
      payload.description, 
      categories, 
      payload.image_url, 
      !payload.shouldHide);
    this.shouldShow = false;
    this.editedPoint = null;
  }
}

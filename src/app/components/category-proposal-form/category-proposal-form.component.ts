import { Component, OnInit } from '@angular/core';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { CategoryService } from 'src/app/services/categories.service';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';

@Component({
  selector: 'app-category-proposal-form',
  templateUrl: './category-proposal-form.component.html',
  styleUrls: ['./category-proposal-form.component.css']
})

export class CategoryProposalFormComponent implements OnInit {

  shouldShow = false;
  categoryName = "";
  categoryDescription = "";
  newCategoryProposalQuestions: QuestionBase<any, any>[];

  constructor(private mapService: MapService,
    private searchService: SearchService,
    private categoryService: CategoryService) {
      this.mapService.newPointAnnounced.subscribe(coords => {
        this.shouldShow = false;
      });
      this.searchService.newPointsAnnounced.subscribe(coords => {
        this.shouldShow = false;
      });
      this.mapService.cardCanceledAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
      this.mapService.pointSelectedAnnounced.subscribe( _ => {
        this.shouldShow = false;
      });
      this.categoryService.newCategoryProposalAnnounced.subscribe( _ => {
        this.proposeCategory();
        this.shouldShow = true;
      });
    }

  ngOnInit() {
  }  

  proposeCategory() {
    this.newCategoryProposalQuestions = [
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
        value: "",
        required: true,
        order: 2
      })
    ];
  }

  onSubmit(name: string, description: string) {
    this.categoryService.announceProposedCategory(name,description);
    this.shouldShow = false;
 }

}

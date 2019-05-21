import { Component, OnInit } from '@angular/core';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { CategoryService } from 'src/app/services/categories.service';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';
import { ProposedCategory } from 'src/app/domain/proposed-category';


@Component({
  selector: 'app-point-create-form',
  templateUrl: './point-create-form.component.html',
  styleUrls: ['./point-create-form.component.css']
})
export class PointCreateFormComponent implements OnInit {

  shouldShow: boolean = false;
  selected_category : ProposedCategory;
  proposed_categories: ProposedCategory[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
  }

  checkCategories() {
    this.categoryService.proposedCategories().subscribe(categories => {
      this.proposedCategoriesCheck = [
        new MulticheckQuestion({
          key: "categories",
          order: 3,
          options: categories.map(c => ({key: c.id, name: c.name})),
        })
      ];
    })
  }

  onSubmit(payload: any) {
    let accepted_categories = []
    Object.entries(payload.categories).forEach(
      ([key, value]) => {
        if (value) {
          accepted_categories.push(Number(key));
        }
      }
    );
    
    this.categoryService.save(accepted_categories);
    this.shouldShow = false;
  }

  getCategories(): void {
    this.categoryService.proposedCategories()
      .subscribe(categories => this.proposed_categories = categories);
  }

}

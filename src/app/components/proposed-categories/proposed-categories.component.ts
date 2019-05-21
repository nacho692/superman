import { Component, OnInit } from '@angular/core';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';
import { CategoryService } from 'src/app/services/categories.service';
import { SearchService } from 'src/app/services/search.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { MulticheckQuestion } from 'src/app/utils/question-multicheck';
import { Category } from 'src/app/domain/category';


@Component({
  selector: 'app-proposed-categories-form',
  templateUrl: './proposed-categories-form.component.html',
  styleUrls: ['./proposed-categories-form.component.css']
})
export class ProposedCategoriesComponent implements OnInit {
  
  proposed_categories : Category[];

  constructor(private categoryService: CategoryService) { 
  }

  ngOnInit() {
    this.getCategories();
  }

  onAccept(category: Category) {
    this.categoryService.announceAcceptedCategory(category);
  }
  
  onReject(category: Category) {
    this.categoryService.announceRejectedCategory(category);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.proposed_categories = categories);
  }


}

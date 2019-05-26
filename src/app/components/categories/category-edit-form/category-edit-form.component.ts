import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';
import { MapService } from 'src/app/services/map.service';
import { QuestionBase } from 'src/app/utils/question-base';
import { TextboxQuestion } from 'src/app/utils/question-textbox';
import { Category } from 'src/app/domain/category';
import { CheckboxQuestion } from 'src/app/utils/question-checkbox';

@Component({
  selector: 'app-category-edit-form',
  templateUrl: './category-edit-form.component.html',
  styleUrls: ['./category-edit-form.component.css']
})

export class CategoryProposalEditFormComponent implements OnInit {

  shouldShow = false;
  editedCategory: Category;
  newCategoryProposalQuestions: QuestionBase<any, any>[];

  constructor(private mapService: MapService,
    private categoryService: CategoryService) {
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
      this.categoryService.categoryEditionAnnounced.subscribe(category => {
        this.editCategory(category);
        this.shouldShow = true;
      });
    }

  ngOnInit() {
  }  

  editCategory(category: Category) {
    this.editedCategory = category;
    this.newCategoryProposalQuestions = [
      new TextboxQuestion({
        key: "name",
        label: "Name",
        value: category.name,
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: "description",
        label: "Description",
        value: category.description,
        required: true,
        order: 2
      }),
      new CheckboxQuestion({
        key: "shouldHide",
        label: "Hide category",
        value: !category.should_show,
        order: 3
      })
    ];
  }

  close() {
    this.shouldShow = false;
    this.editCategory = null;
    this.mapService.announceCardCanceled();
  }
  
  onSubmit(payload: any) {
    this.categoryService.editCategory(this.editedCategory.id, payload.name, payload.description, !payload.shouldHide);
    this.shouldShow = false;
    this.editedCategory = null;
  }
}

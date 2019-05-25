import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/domain/category';
import { MapService } from 'src/app/services/map.service';


@Component({
  selector: 'app-proposed-categories-form',
  templateUrl: './proposed-categories-form.component.html',
  styleUrls: ['./proposed-categories-form.component.css']
})
export class ProposedCategoriesFormComponent implements OnInit {
  
  proposedCategories : Category[];
  shouldShow = false;

  constructor(private mapService: MapService,
    private categoryService: CategoryService) { 
    this.categoryService.showProposalsAnnounced.subscribe(_ => {
      this.shouldShow = true;
    });
    this.categoryService.newCategoryProposalAnnounced.subscribe(_ => {
      this.shouldShow = false;
    });
    this.mapService.cardCanceledAnnounced.subscribe(_ => {
      this.shouldShow = false;
    });
    this.mapService.newPointAnnounced.subscribe(_ => {
      this.shouldShow = false;
    });
  };

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
      .subscribe(categories => this.proposedCategories = categories);
  }
}

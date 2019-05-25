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
      this.getProposedCategories();
    });
    this.categoryService.newCategoryProposalAnnounced.subscribe(_ => {
      this.shouldShow = false;
    });
    this.mapService.newPointAnnounced.subscribe(_ => {
      this.shouldShow = false;
    });
    this.mapService.pointSelectedAnnounced.subscribe(_ => {
      this.shouldShow = false;
    })
  };

  ngOnInit() {
  }

  close() {
    this.shouldShow = false;
    this.mapService.announceCardCanceled();
  }

  acceptCategory(category: Category) {
    this.categoryService.save(category);
    this.proposedCategories = this.proposedCategories
      .filter(pc => pc.id != category.id);
  }
  
  rejectCategory(category: Category) {
    this.categoryService.removeCategoryProposal(category);
    this.proposedCategories = this.proposedCategories
      .filter(pc => pc.id != category.id);
  }

  getProposedCategories(): void {
    this.categoryService.getProposedCategories()
      .subscribe(proposedCategories => this.proposedCategories = proposedCategories);
  }
}

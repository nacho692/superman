import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../domain/category';
import { CategoryService } from '../../services/categories.service';
import { SearchService } from 'src/app/services/search.service';
import { getHeapStatistics } from 'v8';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  
  categories : Category[];
  selectedCategories: Set<Category>;

  constructor(private categoryService: CategoryService, private searchService: SearchService) { 
    this.selectedCategories = new Set();
    this.getCategories();
    this.categoryService.modifiedCategoriesAnnounced.subscribe(_ => {
      this.getCategories();
    });
  }

  ngOnInit() {
  }

  onSelect(category: Category) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category)
    } else {
      this.selectedCategories.add(category);
    }
    this.searchService.announceNewCategories(this.selectedCategories);
  }
  
  onEdit(category: Category) {
    this.categoryService.announceCategoryEdition(category);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}

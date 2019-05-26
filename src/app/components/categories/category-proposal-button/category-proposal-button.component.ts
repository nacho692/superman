import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-proposal-button',
  templateUrl: './category-proposal-button.component.html',
  styleUrls: ['./category-proposal-button.component.css']
})
export class CategoryProposalButtonComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}

  onClick() {
    this.categoryService.announceNewCategoryProposal();
  }

  ngOnInit() {
  }

}

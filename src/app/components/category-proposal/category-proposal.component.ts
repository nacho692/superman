import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-proposal',
  templateUrl: './category-proposal.component.html',
  styleUrls: ['./category-proposal.component.css']
})
export class CategoryProposalComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}

  onClick() {
    this.categoryService.announceNewCategoryProposal();
  }

  ngOnInit() {
  }

}

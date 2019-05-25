import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-show-proposals',
  templateUrl: './show-proposals.component.html',
  styleUrls: ['./show-proposals.component.css']
})
export class ShowProposalsComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}

  onClick() {
    this.categoryService.announceShowProposals();
  }

  ngOnInit() {
  }

}

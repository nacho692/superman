import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-show-proposals-button',
  templateUrl: './show-proposals-button.component.html',
  styleUrls: ['./show-proposals-button.component.css']
})
export class ShowProposalsButtonComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}

  onClick() {
    this.categoryService.announceShowProposals();
  }

  ngOnInit() {
  }

}

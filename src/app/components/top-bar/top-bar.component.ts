import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search(searchQuery: string) {
    this.searchService.announceNewQuery(searchQuery);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PointsOfInterestService } from './points-of-interest.service';
import { PointOfInterest } from '../domain/point-of-interest';
import { Category } from '../domain/category';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private newPointsOfInterests = new Subject<Array<PointOfInterest>>();

  private searchQuery = "";
  private selectedCategories = new Set<Category>();
  
  newPointsAnnounced = this.newPointsOfInterests.asObservable();

  constructor(private pointsOfInterestService: PointsOfInterestService) { }

  announceNewQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.emitSearch();
  }

  announceNewCategories(newCategories: Set<Category>) {
    this.selectedCategories = newCategories;
    this.emitSearch();
  }

  private emitSearch() {
    this.pointsOfInterestService.search(this.searchQuery, Array.from<Category>(this.selectedCategories).map(c => c.id))
    .subscribe(pois => {
      this.newPointsOfInterests.next(pois);
    });
  }
}
